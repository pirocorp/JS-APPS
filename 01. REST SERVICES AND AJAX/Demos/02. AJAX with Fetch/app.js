(function() {    
    const reposList = document.getElementById('repos-list');

    //moving inline functions into variable functions 
    //makes code more easy testable
    const parseRepo = ({ html_url, full_name }) => {
        return {
            link: html_url,
            name: full_name
        };
    }

    const toDomElement = ({ name, link }) => {
        const liItem = document.createElement('li');
        const linkItem = document.createElement('a');
        linkItem.href = link;
        linkItem.innerHTML = name;
        liItem.appendChild(linkItem);

        return liItem;
    }

    //In arrow function this is not in executable context but in 
    //creational context => this will point window/global
    const handleResponse = (response) => {    
    response
        .map(parseRepo)
        .map(toDomElement)
        .forEach(el => {
            reposList.appendChild(el);
        });
    };

    //AJAX with Fetch returns promise btw json() returns also promise
    const onSendButtonClick = (ev) => {
        fetch('https://api.github.com/users/pirocorp/repos')
            .then(response => response.json())
            .then(handleResponse);

        //prevents the default action on event of dom element
        ev.preventDefault();
    };

    document.getElementById('btn-send')
        .addEventListener('click', onSendButtonClick);
})();