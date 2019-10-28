import RootComponent from './scripts/rootComponent' //ES6 Syntax

/* Hackers way for copy index.html */
/* require('file-loader?name=[name].[ext]!./index.html'); */

/* Hackers way jquery */
require('expose-loader?$!jquery');

window.onload = () => {
    const rootElement = new RootComponent(document.getElementById('root'));
};