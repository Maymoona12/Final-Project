const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    // Define the entry point of the application
    entry: path.resolve(__dirname, "./src/client/index.js"),

    // Define the loaders to handle specific file types
    module: {
        rules: [
            {
                test: /\.js$/, // Regular expression to match JavaScript files
                exclude: /node_modules/, // Avoid transpiling node modules
                use: "babel-loader", // Use Babel to transpile JS files
            },
        ],
    },

    // Enable optimization for minimizing assets
    optimization: {
        minimize: true, // Minimize the output files
        minimizer: [
            new CssMinimizerPlugin(), // Minimize CSS files
        ],
    },

    // Add plugins to enhance Webpack functionality
    plugins: [
        // Plugin to generate the HTML file
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/client/views/index.html"), // Source template
            filename: "index.html", // Output filename
        }),

        // Plugin to clean the output folder before each build
        new CleanWebpackPlugin({
            dry: true, // Simulate removal of files (dry run)
            cleanStaleWebpackAssets: true, // Remove unused assets
            verbose: false, // Disable logs
            protectWebpackAssets: false, // Allow removal of assets not used in the build
        }),
    ],
};
