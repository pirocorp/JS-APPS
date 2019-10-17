const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/books`;
let authToken;

const elements = {
    btnLoadBooks: document.getElementById('btnLoadBooks'),
    btnSubmit: document.getElementById('btnSubmit'),

    form: {
        title: document.getElementById('title'),
        author: document.getElementById('author'),
        isbn: document.getElementById('isbn'),
        tags: document.getElementById('tags'),
        btnDoneEdit: document.getElementById('btnDoneEdit'),
        btnCancel: document.getElementById('btnCancel'),
    },

    books: document.getElementById('books'),
    formTitle: document.getElementById('form-title'),
};

function attachBookToDom(book) {
    function createTd(text) {
        const td = document.createElement('td');
        td.textContent = text;
        return td;
    };

    function createButtons() {
        async function onBtnEditClick(ev) {
            const currentBook = ev.currentTarget.parentElement.parentElement;

            const dataElements = currentBook.getElementsByTagName('td');
            const title = dataElements[0].textContent;
            const author = dataElements[1].textContent;
            const isbn = dataElements[2].textContent; 
            const currentBookId = currentBook.getAttribute('data-id');

            const request = {
                method: 'GET',
                headers: {
                    authorization: 'Kinvey ' + authToken,
                    'Content-Type': 'application/json',
                },
            };

            const tags = await fetch(`${baseUrl}/${currentBookId}`, request)
                .then(handler)
                .then(r => {
                    if(r.tags) {
                        return r.tags.join(', ');
                    } else {
                        return '';
                    };
                })
                .catch(console.log());

            elements.formTitle.textContent = 'EDIT';
            elements.formTitle.setAttribute('data-id', currentBookId);

            elements.form.title.value = title;
            elements.form.author.value = author;
            elements.form.isbn.value = isbn;
            elements.form.tags.value = tags;

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
                    authorization: 'Kinvey ' + authToken,
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

async function loadBooks() {  
    if(!authToken) {
        authToken = await login();
    }

    const request = {
        method: 'GET',
        headers: {
            authorization: 'Kinvey ' + authToken,
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
        tags: elements.form.tags.value.split(', ').filter(x => x !== ''),
    };

    const request = {
        method: 'POST',
        headers: {
            authorization: 'Kinvey ' + authToken,
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
    elements.form.tags.value = '';
};

function clearEditForm() {
    elements.form.title.value = '';
    elements.form.author.value = '';
    elements.form.isbn.value = '';
    elements.form.tags.value = '';

    elements.formTitle.textContent = 'FORM';
    elements.formTitle.removeAttribute('data-id');

    elements.btnSubmit.style.display = '';
    elements.form.btnCancel.style.display = 'none';
    elements.form.btnDoneEdit.style.display = 'none';
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
        tags: elements.form.tags.value.split(', ')
            .map(x => x.trim())
            .filter(x => x !== ''),
    };

    const request = {
        method: 'PUT',
        headers: {
            authorization: 'Kinvey ' + authToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
    };

    fetch(`${baseUrl}/${currentBookId}`, request)
        .then(handler)
        .then(() => loadBooks())
        .catch(console.log);

    clearEditForm();
};

function onBtnCancel(ev) {
    ev.preventDefault();

    clearEditForm();
};

elements.btnSubmit.addEventListener('click', onBtnSubmitClick);

elements.form.btnDoneEdit.addEventListener('click', onBtnDoneEdit);
elements.form.btnCancel.addEventListener('click', onBtnCancel);

loadBooks();