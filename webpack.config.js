const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, "examples/src/index.html"),
	filename: "./index.html"
});

const buildConfig = args => {
	const isDev = args !== 'prod';
console.log('isDev', isDev);
	return {
		entry: isDev ? path.join(__dirname, "examples/src/index.js") : path.join(__dirname, "src/index.js"),
		output: isDev ? {
			path: path.join(__dirname, "examples/dist"),
			filename: "bundle.js"
		} : {
			path: path.join(__dirname, "examples/dist"),
			filename: "bundle.js"
			/*path: path.join(__dirname, './build'),
			filename: 'clientForm.js',
			library: 'clientForm',*/
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
		plugins: isDev ?
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
			],
		resolve: {
			extensions: [".js", ".jsx"]
		},
		externals: isDev ? {} : {
			/*react: 'React',
			'react-dom' : 'ReactDOM'*/
		},
		devServer: {
			host: '0.0.0.0',
			port: 3007,
			disableHostCheck: true
		}
	};
};

module.exports = buildConfig;
