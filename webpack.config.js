const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});
const isLocal = process.env.LOCAL_MODE;

module.exports = {
    entry: path.join(__dirname, "examples/src/index.js"),
		output: {
        path: path.join(__dirname, "examples/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
				        loader: 'babel-loader'
            },
						{
                test: /\.(css|scss)$/,
                use: [
									"style-loader",
									{ loader: 'css-loader', options: { importLoaders: 1 } },
									"postcss-loader",
									"sass-loader"
								]
            },
						{
			        test: /favicon\.ico$/,
			        loader: 'url-loader',
			        query: {
			          limit: 1,
			          name: '[name].[ext]',
			        },
			      },
        ]
    },
    plugins: isLocal ?
			[
				htmlWebpackPlugin,
			]
			:
			[
				htmlWebpackPlugin,
				new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),
				new webpack.optimize.DedupePlugin(),
		    new webpack.NoErrorsPlugin(),
			],
		resolve: {
	      extensions: [".js", ".jsx"]
	  },
    devServer: {
        port: 3007
    }
};
