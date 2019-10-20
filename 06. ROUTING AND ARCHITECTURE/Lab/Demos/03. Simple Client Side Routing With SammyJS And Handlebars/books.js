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

function getBook(id) {
    const book = books.find(book => book.id === id);    

    return book;
};

function createJQueryBookList() {
    const $bookList = $('<ul class="book-list"></ul>');

    for (const book of books) {
        $bookList.append($(`<li><a href="#/books/${book.id}">${book.title}</a></li>`));
    }

    return $bookList;
};