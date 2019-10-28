/* Webpack configuration file */
/* In package.json in section scripts is defined alias for the full webpack command */
/* can be started with alias npm start */

/* Cross environment package for file/dir location */
const path = require('path');

/* Configuration */
module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'), /* './src/index.js' default setting './src/index.js' */
    output: {
        filename: 'bundle.min.js', /* default setting 'main.js' */
        /* __dirname -> current dir for webpack config file */
        /* if in current dir there is no dist dir it will be created */
        path: path.resolve(__dirname, 'dist'), /* default setting './dist/'*/
    },
    /* Modules adding loaders for processing other than JS files */
    module: {
        rules: [{
            test: /\.css$/, /* Regex for string ending with .css */
            /* loaders are executed on reverse (e.g first css-loader next style-loader) */
            use: [
                'style-loader', /* convert back to css from string (e.g. makes style tags and puts css inside them)*/
                'css-loader', /* convert css to string */
            ], /* use these loaders for .css files */
        }],
    },
};