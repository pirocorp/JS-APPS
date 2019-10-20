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

function createJQueryBookElement(id) {
    const book = books.find(book => book.id === id);

    const $bookContent = $(`<div class="book" data-id="${id}"><div>`)

    if (book) {
        $bookContent.html(`
            <h1>Title: ${book.title}</h1>
            <h2>Author: ${book.author}</h2>
            <h3>Release date: ${book.releaseDate}</h3>
        `);
    } else {
        $bookContent.html('<h1>Book Not Found</h1>');
    }

    return $bookContent;
};

function createJQueryBookList() {
    const $bookList = $('<ul class="book-list"></ul>');

    for (const book of books) {
        $bookList.append($(`<li><a href="#/books/${book.id}">${book.title}</a></li>`));
    }

    return $bookList;
};