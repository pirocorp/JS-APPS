//Sammy offers client side routing
//first parameter tells sammy where to attach swapped content
const app = Sammy('#sammy-app', function() {
    //Telling Sammy to use handlebars template engine and 
    //template extension is *.hbs
    this.use('Handlebars', 'hbs')

    const handleHome = () => {
        this.swap('<h1>Hello from the home page</h1>');
    };

    const handleAbout = () => {
        this.swap('<h1>Hello from the about page</h1>');
    };

    function handleBooks() {
        const $bookList = createJQueryBookList();
        this.swap($bookList);
    };

    //context parameter is passed(injected) by Sammy
    //context and this point to same object 
    //when this acts like in other languages
    //In this case because i use arrow function this wont work
    const handleBook = (context) => {
        const bookId = Number(context.params.bookId);
        const book = getBook(bookId);

        //set local variables for template
        context.book = book;  
        //render the template      
        context.partial('book-info.hbs');
    };

    //context parameter is passed(injected) by Sammy
    const getLogin = (context) => {
        //render the template   
        context.partial('login-form.hbs');
    };

    const postLogin = ({ params }) => {
        //here are values submitted by the form as kvp, key -> name
        const { username, password } = params;
        
        this.swap(`<div>You have been hacked! Your username and password are: ${username} ${password}</div>`)
    };
    
    this.get('/', handleHome);    
    this.get('#/about', handleAbout);
    this.get('#/books', handleBooks)
    this.get('#/books/:bookId', handleBook);
    this.get('#/login', getLogin);
    this.post('#/login', postLogin)
});

//on DOM Ready event jQuery will run app
$(() => app.run());