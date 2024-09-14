// Import necessary modules and configuration
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

module.exports = merge(commonConfig, {
    // Set the mode to development for better debugging and non-minified output
    mode: "development",

    // Enable source maps for easier debugging
    devtool: "source-map",

    // Define how different file types should be processed
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i, // Match SCSS and Sass files
                use: [
                    "style-loader", // Injects CSS into the DOM
                    "css-loader",   // Resolves CSS imports
                    "sass-loader"   // Compiles Sass to CSS
                ]
            }
        ]
    },

    // Output configuration for development build
    output: {
        filename: "bundle.js", // Output filename for the bundled JS
        path: path.resolve(__dirname, "dist"), // Output directory for the build
        libraryTarget: "var", // Export the library as a global variable
        library: "Client", // Name of the global variable for the library
        clean: true, // Clean output directory before each build
    },

    // Optimize and minimize the CSS output
    optimization: {
        minimize: true, // Enable minification
        minimizer: [
            new CssMinimizerPlugin(), // Plugin to minimize CSS
        ]
    }
});
