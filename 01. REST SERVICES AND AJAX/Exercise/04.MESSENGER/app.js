function attachEvents() {
    const host = 'https://rest-messanger.firebaseio.com/messanger/';
    const sendButtonElement = document.getElementById('submit');
    const refreshButtonElement = document.getElementById('refresh');
    const messagesElement = document.getElementById('messages');
    const authorElement = document.getElementById('author');
    const contentElement = document.getElementById('content');

    function appendEntry(entry) {
        messagesElement.value += `${entry.author}: ${entry.content}\n`;
    }

    function onSendButtonClick(ev) {
        const author = authorElement.value;
        const content = contentElement.value;

        if(author === '' || content === '') {
            return;
        }

        const url = host + '.json';

        function success(data) {
            if(data.name) {
                appendEntry({ author, content });
            }
        }

        function error(err) {
            console.log(err);
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ author, content }),
        }).then((response) => response.json())
            .then((data) => success(data))
            .catch((err) => error(err));

        authorElement.value = '';
        contentElement.value = '';
    }

    function onRefreshButtonClick(ev) {
        const url = host + '.json';
        messagesElement.value = '';

        function success(data) {
            const entries = Object.entries(data)
                .map(x => x[1]);

            for (const entry of entries) {
                appendEntry(entry);                
            }
        }

        function error(err) {
            console.log(err);
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => success(data))
            .catch((err) => error(err))
    }

    sendButtonElement.addEventListener('click', onSendButtonClick);
    refreshButtonElement.addEventListener('click', onRefreshButtonClick);

}

attachEvents();