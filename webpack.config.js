const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});
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
							loader: 'url-loader',
		          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
							options: {
		            limit: 10000,
		          },
		        },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
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
    plugins: [htmlWebpackPlugin],
		resolve: {
	      extensions: [".js", ".jsx"]
	  },
    devServer: {
        port: 3007
    }
};
