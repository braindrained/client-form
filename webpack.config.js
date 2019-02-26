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
		optimization: {
			splitChunks: false,
			minimizer: [
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: true,
						screw_ie8: true, // eslint-disable-line camelcase
						warnings: false, // Because uglify reports irrelevant warnings.
						cache: true,
		        parallel: true
					}
				})
			],
		},
    entry: path.join(__dirname, "examples/src/index.js"),
		output: {
        path: path.join(__dirname, "examples/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
						{
							loader: 'url-loader',
		          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
							options: {
		            limit: 10000,
		          },
		        },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
								use: {
					        loader: 'babel-loader',
					        options: {
					          presets: ['@babel/preset-env']
					        }
					      }
            },
						{
                test: /\.(css|scss)$/,
                use: [
									"style-loader",
									{ loader: 'css-loader', options: { importLoaders: 1 } },
									"postcss-loader",
									"sass-loader"
								]
            }
        ]
    },
    plugins: isLocal ?
			[
				htmlWebpackPlugin,
				new BundleAnalyzerPlugin(),
				new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /it/)
			]
			:
			[
				htmlWebpackPlugin,
				new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /it/),
				new webpack.optimize.DedupePlugin(),
		    new webpack.NoErrorsPlugin(),
		    new CompressionPlugin({
		      asset: "[path].gz[query]",
		      algorithm: "gzip",
		      test: /\.js$|\.css$|\.html$/,
		      threshold: 10240,
		      minRatio: 0
		    })
			],
		resolve: {
	      extensions: [".js", ".jsx"]
	  },
    devServer: {
        port: 3007
    }
};
