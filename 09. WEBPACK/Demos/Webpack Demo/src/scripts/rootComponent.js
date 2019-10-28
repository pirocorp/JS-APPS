//import _ from 'lodash'; //Imports Whole lodash library into bundle js file
//import { each } from 'lodash' //Again Imports Whole lodash library into bundle js file
import each from 'lodash/each' //Import only each into bundle js file
import { steps } from './data'; //Named import Syntax

//Importing CSS through JavaScript
import '../css/heading.css';
import '../css/steps.css';

//Importing handlebars
import headingTemplate from '../views/root.hbs';

class RootComponent {
    constructor(parent) {
        this.parent = parent;

        this.render();
        this.addEventListeners();
    };

    addEventListeners() {
        $(this.parent)
            .find('.steps')
            .on('click', 'li', e => {
                console.log(e);
            })
    };

    prepareData() {
        return {
            title: "Steps to learn webpack",
            steps,
        };
    };

    render() {
        this.parent.innerHTML = headingTemplate(this.prepareData());      
    };
};

//module.exports = RootComponent; //Node.js Syntax
export default RootComponent; //ES6 Syntax