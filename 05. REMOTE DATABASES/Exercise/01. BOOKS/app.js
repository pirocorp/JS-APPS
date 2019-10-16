const username = 'guest';
const password = 'guest';
const appKey = 'kid_SyMuKqEYB';
const appSecret = 'a79c252bdb3448649174a7834f3b47d8';

const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/books`;

const elements = {
    btnLoadBooks: document.getElementById('btnLoadBooks'),
    btnSubmit: document.getElementById('btnSubmit'),

    form: {
        title: document.getElementById('title'),
        author: document.getElementById('author'),
        isbn: document.getElementById('isbn'),
        btnDoneEdit: document.getElementById('btnDoneEdit'),
        btnCancel: document.getElementById('btnCancel'),
    },

    books: document.getElementById('books'),
    formTitle: document.getElementById('form-title'),
};

function handler(response) {
    if(response.status >= 400) {
        const errorMessage = `${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }

    //response.json() returns a Promise
    return response.json();
};

/* function setCurrentBookToEditForm(currentBook) {
    
} */

function attachBookToDom(book) {
    function createTd(text) {
        const td = document.createElement('td');
        td.textContent = text;
        return td;
    };

    function createButtons() {
        function onBtnEditClick(ev) {
            const currentBook = ev.currentTarget.parentElement.parentElement;

            const dataElements = currentBook.getElementsByTagName('td');
            const title = dataElements[0].textContent;
            const author = dataElements[1].textContent;
            const isbn = dataElements[2].textContent; 
            const currentBookId = currentBook.getAttribute('data-id');

            elements.formTitle.textContent = 'EDIT';
            elements.formTitle.setAttribute('data-id', currentBookId);

            elements.form.title.value = title;
            elements.form.author.value = author;
            elements.form.isbn.value = isbn;

            elements.btnSubmit.style.display = 'none';
            elements.form.btnCancel.style.display = '';
            elements.form.btnDoneEdit.style.display = '';
        };

        function onBtnDeleteClick(ev) {
            const currentBook = ev.currentTarget.parentElement.parentElement;
            const currentBookId = currentBook.getAttribute('data-id');
            
            const request = {
                method: 'Delete',
                headers: {
                    authorization: 'Basic ' + btoa(`${username}:${password}`),
                    'Content-Type': 'application/json',
                },
            };

            function processResponse(response) {
                if(response.count > 0) {
                    currentBook.parentElement.removeChild(currentBook);
                }
            };

            fetch(`${baseUrl}/${currentBookId}`, request)
                .then(handler)
                .then(processResponse)
                .catch(console.log);
        };

        const td = document.createElement('td');

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.addEventListener('click', onBtnEditClick);

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.addEventListener('click', onBtnDeleteClick);

        td.appendChild(btnEdit);
        td.appendChild(btnDelete);

        return td;
    }

    const bookElement = document.createElement('tr');
    bookElement.setAttribute('data-id', book._id);

    bookElement.appendChild(createTd(book.title));
    bookElement.appendChild(createTd(book.author));
    bookElement.appendChild(createTd(book.isbn));
    bookElement.appendChild(createButtons());

    elements.books.appendChild(bookElement);
};

function loadBooks() {
    const request = {
        method: 'GET',
        headers: {
            authorization: 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
        },
    };

    function processResponse(response) {
        for (const element of response) {
            attachBookToDom(element);
        }
    };

    fetch(baseUrl, request)
        .then(handler)
        .then(processResponse)
        .catch(console.log);

    elements.books.innerHTML = '';    
};

function onBtnSubmitClick(ev) {
    ev.preventDefault();

    if (!elements.form.title.value ||
        !elements.form.author.value ||
        !elements.form.isbn.value) {
            return;
        }

    const newBook = {
        title: elements.form.title.value,
        author: elements.form.author.value,
        isbn: elements.form.isbn.value,
    };

    const request = {
        method: 'POST',
        headers: {
            authorization: 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
    };

    fetch(baseUrl, request)
        .then(handler)
        .then(() => loadBooks())
        .catch(console.log);

    elements.form.title.value = '';
    elements.form.author.value = '';
    elements.form.isbn.value = '';
};

function onBtnDoneEdit(ev) {
    ev.preventDefault();

    const currentBookId = elements.formTitle.getAttribute('data-id');

    if (!elements.form.title.value ||
        !elements.form.author.value ||
        !elements.form.isbn.value) {
            return;
        }

    const updatedBook = {
        title: elements.form.title.value,
        author: elements.form.author.value,
        isbn: elements.form.isbn.value,
    };

    const request = {
        method: 'PUT',
        headers: {
            authorization: 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
    };

    fetch(`${baseUrl}/${currentBookId}`, request)
        .then(handler)
        .then(() => loadBooks())
        .catch(console.log);

    elements.form.title.value = '';
    elements.form.author.value = '';
    elements.form.isbn.value = '';

    elements.formTitle.textContent = 'FORM';
    elements.formTitle.removeAttribute('data-id');

    elements.btnSubmit.style.display = '';
    elements.form.btnCancel.style.display = 'none';
    elements.form.btnDoneEdit.style.display = 'none';
};

function onBtnCancel(ev) {
    ev.preventDefault();

    elements.form.title.value = '';
    elements.form.author.value = '';
    elements.form.isbn.value = '';

    elements.formTitle.textContent = 'FORM';
    elements.formTitle.removeAttribute('data-id');

    elements.btnSubmit.style.display = '';
    elements.form.btnCancel.style.display = 'none';
    elements.form.btnDoneEdit.style.display = 'none';
};

elements.btnSubmit.addEventListener('click', onBtnSubmitClick);

elements.form.btnDoneEdit.addEventListener('click', onBtnDoneEdit);
elements.form.btnCancel.addEventListener('click', onBtnCancel);

loadBooks();