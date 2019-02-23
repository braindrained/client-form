const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
		devtool: 'cheap-module-source-map',
    entry: path.join(__dirname, "examples/src/index.js"),
		output: {
        path: path.join(__dirname, "build"),
				chunkFilename: '[name].bundle.js',
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
						{
		          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
							use: [
									{
											loader: 'url-loader',
											options:{
													fallback: "file-loader",
													name: "[name][md5:hash].[ext]",
													outputPath: 'assets/',
													publicPath: '/assets/'
											}
									}
							]
		        },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
						{
							test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      				loader: 'file-loader?name=fonts/[name].[ext]'
		        },
						{
                test: /\.(scss)$/,
                use: [
									devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
									"style-loader",
									"css-loader",
									"sass-loader"
								]
            }
        ]
    },
    plugins: [
			htmlWebpackPlugin,
			new MiniCssExtractPlugin({
				filename: devMode ? '[name].css' : '[name].[hash].css',
	      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
			})
		],
    devServer: {
        port: 3007
    }
};
