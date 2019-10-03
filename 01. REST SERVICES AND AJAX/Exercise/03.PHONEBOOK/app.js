//IIFE
(() => {
    const host = 'https://phonebook-476af.firebaseio.com/phonebook/';
    const phonebookElement = document.querySelector('#phonebook');
    const personElement = document.querySelector('#person');
    const phoneElement = document.querySelector('#phone');
    const errorElement = document.querySelector('#error');

    //Attach event listeners to buttons
    document.querySelector('#btnLoad').addEventListener('click', loadContacts);
    document.querySelector('#btnCreate').addEventListener('click', createContact);

    //Implement delete contact
    // -add delete button to list
    // -send DELETE request containing contact ID
    function deleteContact(id, ev) {
        //Good practice is success function to be 
        //declared inside function that calls them
        function success(ev) {
            ev.target.parentElement.remove();
        };

        function error(err) {
            console.log(err);
        };

        const url = host + id + '.json';

        fetch(url, {
            method: 'DELETE'
        }).then((response) => response.json())
            .then(() => success(ev))
            .catch((err) => error(err));
    };

    function appendContact(entry, key) {
        const contact = document.createElement('li');
        contact.textContent = `${entry.person}: ${entry.phone}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        //Passing more parameters to event handler with arrow function
        deleteBtn.addEventListener('click', (ev) => deleteContact(key, ev));

        contact.appendChild(deleteBtn);
        phonebookElement.appendChild(contact);
    };

    //Implement loading of contacts
    // -on click send GET request
    // -display data in list (clear list first)
    function loadContacts() {
        phonebookElement.innerHTML = '';
        phonebookElement.innerHTML = '<li>Loading &hellip;</li>';

        //By default Method is GET
        function success(data) {            
            phonebookElement.innerHTML = '';

            for (const key in data) {
                let entry = data[key];
                appendContact(entry, key);
            }
        };

        function error(err) {
            console.log(err);
        };

        const url = host + '.json';
        fetch(url)
            .then((response) => response.json())
            .then((data) => success(data))
            .catch((err) => error(err));
    };

    //implement creating contacts
    // -take values from inputs
    // -make POST request with data
    // -(optional) refresh GET request
    // -(or) optimistic local update
    function createContact() {
        const person = personElement.value;
        const phone = phoneElement.value;

        if (person === '' || phone === '') {
            errorElement.textContent = 'Both Person and Phone are required';
            return;
        }

        errorElement.textContent = '';

        function success(data) {
            const { name } = data;
            appendContact({ person, phone }, name);

            personElement.value = '';
            phoneElement.value = '';
        };

        function error(err) {
            console.log(err);
        };

        const url = host + '.json';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ person, phone }),
        }).then((response) => response.json())
            .then((data) => success(data))
            .catch((err) => error(err));
    };

    //loadContacts();
})();