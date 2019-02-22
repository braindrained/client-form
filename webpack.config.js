const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/index.html"),
    filename: "./index.html"
});

module.exports = {
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
                use: "babel-loader",
                exclude: /node_modules/
            },
						{
							test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      				loader: 'file-loader?name=fonts/[name].[ext]'
		        },
						{
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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
