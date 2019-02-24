const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});
const devMode = process.env.NODE_ENV !== 'production'
console.log(devMode);
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
									'style-loader',
									"style-loader",
									"css-loader",
									"sass-loader"
								]
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    devServer: {
        port: 3007
    }
};
