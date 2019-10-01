(function() {    
    const reposList = document.getElementById('repos-list');

    const statusChecker = {
        isSuccess: (status) => status === 200,
    }

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

    //In arrow function this is not in executable context 
    //but in creational context => arrow function wont work here
    const handleResponse = function() {
        if(this.readyState < 4) {
            return;
        }

        if(!statusChecker.isSuccess(this.status)) {
            return;
        }

       JSON.parse(this.response)
        .map(parseRepo)
        .map(toDomElement)
        .forEach(el => {
            reposList.appendChild(el);
        });
    };

    const onSendButtonClick = (ev) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = handleResponse;
        xhr.open("GET",
            "https://api.github.com/users/testnakov/repos", true);
        xhr.send();

        //prevents the default action on event of dom element
        ev.preventDefault();
    };

    document.getElementById('btn-send')
        .addEventListener('click', onSendButtonClick);
})();