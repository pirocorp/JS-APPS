//Q: Recursive reference how to stop this recursive reference
//Add property visited after is set to true stop the recursion
let cat = {
    people: [],
};

let person = {
    cats: [],
}

//Q: Best practices in JS
//A: naming convention of variables and functions
//A: SOLID ?!?
//A: using const and let not var, always writing semicolon and row end;
//A: after last key value pair in object we use coma,
//A: don't send unused parameters to functions
//A: don't use arguments

//Q: CSS Selectors
//#id {
    //A: Highest priority is hard to overwrite it
    //A: Most wrong
//}

//nav > ul > li > a {
    //A: too explicit too strict
    //A: Semi wrong :)
//}

//.nav-menu .single-item {
    //A: most correct
//}

//Q: Why separate JS CSS AND HTML
//A: Readability
//A: Browser Caching of CSS files
//A: Reusability
//A: Separation of concerns