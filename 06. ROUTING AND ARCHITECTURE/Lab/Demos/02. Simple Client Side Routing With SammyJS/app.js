//Sammy offers client side routing
//first parameter tells sammy where to attach swapped content
const app = Sammy('#sammy-app', function() {
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

    const handleBook = (context) => {
        const bookId = Number(context.params.bookId);
        const currentBook = createJQueryBookElement(bookId);
        this.swap(currentBook);
    };

    const getLogin = () => {
        this.swap(`
            <form method="POST" action="#/login">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" />

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" />

                <button type="submit">Login</button>
            </form>
        `);
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