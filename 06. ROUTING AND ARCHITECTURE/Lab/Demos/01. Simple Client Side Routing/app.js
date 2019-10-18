const books = [
    {
        id: 1,
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        releaseDate: 1995
    },
    {
        id: 2,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        releaseDate: 1954
    },
];

const harryPotterTrigger = document.getElementById('harry-potter-trigger');
const lordOfTheRingsTrigger = document.getElementById('lord-of-the-rings-trigger');
const bookContent = document.getElementById('book-content');

//gets rout after # -> and using it to create simple client side routing
const inputRoutParts = window.location.hash.split('/').filter(s => s !== '#');
const entities = inputRoutParts[0];
const id = Number(inputRoutParts[1]);

function showBook(id) {
    const book = books.find(book => book.id === id);

    if (book) {
        bookContent.innerHTML = `
            <h1>Title: ${book.title}</h1>
            <h2>Author: ${book.author}</h2>
            <h3>Release date: ${book.releaseDate}</h3>
        `;
    } else {
        bookContent.innerHTML =  '<h1>Book Not Found</h1>'
    }
};

switch(entities) {
    case 'book':
        showBook(id);
        break;
    default: bookContent.innerHTML = '<h1>Not Found 404</h1>';
};

harryPotterTrigger.addEventListener('click', () => {
    const bookId = 1;

    //Using history api for creating client side routing
    //first parameter is object state, title parameter, route for this state
    history.pushState({ bookId: bookId }, 'Harry Potter', `#/book/${bookId}`);
    showBook(bookId);
});

lordOfTheRingsTrigger.addEventListener('click', () => {
    const bookId = 2;

    //first parameter is object state, title parameter, route for this state
    history.pushState({ bookId: bookId }, 'The Lord of the Rings', `#/book/${bookId}`);
    showBook(bookId);
});

//popstate event is fired every time when forward or backward browser buttons are clicked
window.addEventListener('popstate', ({ state }) => {
    if(!state) {
        bookContent.innerHTML = '';
        return;
    };

    const { bookId } = state;
    showBook(bookId);
});