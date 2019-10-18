//handles Kinvey response and trows error for HTTP response codes 4xx 5xx
function handler(response) {
    //logs error returned by Kinvey
    function logError(err, errorMessage) {
        console.warn(errorMessage);
        console.warn(err.error);
        console.warn(err.description);
        console.warn(err.debug);
    };

    if(response.status >= 400) {
        const errorMessage = `${response.status} - ${response.statusText}`;
        response.json()
            .then(err => logError(err, errorMessage));
        throw new Error(errorMessage);
    };

    //response.json() returns a Promise
    return response;//.json(); -> .json() if we using fetch
};

function attachEvents() {
    const elements = {
        players: $('#players'),
    };
    
    function createJQueryElementPlayer(data) {
        let currentPlayer = $(
    `<div class="player" data-id="${data._id}">
        <div class="row">
            <label>Name:</label>
            <label class="name">${data.name}</label>
        </div>
        <div class="row">
            <label>Money:</label>
            <label class="money">${data.money}</label>
        </div>
        <div class="row">
            <label>Bullets:</label>
            <label class="bullets">${data.bullets}</label>
        </div>
    </div>`);
    
        return currentPlayer;
    };
    
    function onPlayButtonClick(ev) {
        const playerId = ev.currentTarget.parentElement.getAttribute('data-id');
        $.ajax({
            url: `${url}/${playerId}`,
            headers: headers,
            method: 'GET',        
        })
        .then(handler)
        .then((player) => {
            $('#canvas').css('display', 'block');
            $('#save').css('display', '');
            $('#reload').css('display', '');

            currentPlayer.name = player.name;
            currentPlayer.money = player.money;
            currentPlayer.bullets = player.bullets;
            currentPlayer._id = player._id;

            if(!canvasIsStarted) {
                canvasIsStarted = true;
                loadCanvas(currentPlayer);
            }
        })
        .catch(console.log);
    };
    
    function createJQQueryButtonPlay() {
        let button = $('<button class="play">Play</button>');
        button.on('click', onPlayButtonClick);
    
        return button;
    };
    
    function onDeleteButtonClick(ev) {
        const playerId = ev.currentTarget.parentElement.getAttribute('data-id');
        
        $.ajax({
            url: `${url}/${playerId}`,
            headers: headers,
            method: 'DELETE',        
        })
        .then(handler)
        .then(() => loadPlayers())
        .catch(console.log);
    };
    
    function createJQQueryButtonDelete() {
        let button = $('<button class="delete">Delete</button>');
        button.on('click', onDeleteButtonClick);
    
        return button;
    };

    function loadPlayers() { 
        function processResponse(data) {
            elements.players.html('');

            for (const player of data) {
                const currentPlayer = createJQueryElementPlayer(player);
                const playBtn = createJQQueryButtonPlay();
                const deleteBtn = createJQQueryButtonDelete();
                
                currentPlayer.append(playBtn);
                currentPlayer.append(deleteBtn);

                elements.players.append(currentPlayer);
            };
        };

        $.ajax({
            url: url,
            headers: headers,
            method: 'GET',        
        })
        .then(handler)
        .then(processResponse)
        .catch(console.log);
    };    

    function onAddPlayerButtonClick() {
        const $addName = $('#addName');

        const currentName = $addName.val();

        const body = {
            money: 500,
            bullets: 6,
            name: currentName
        };

        $.ajax({
            url: url,
            headers: headers,
            method: 'POST', 
            data: JSON.stringify(body),  
        })
        .then(handler)
        .then(() => loadPlayers())
        .catch(console.log);


        $addName.val('');
    };

    function onSaveButtonClick() {
        $('#canvas').css('display', 'none');
        $('#save').css('display', 'none');
        $('#reload').css('display', 'none');

        $('#players').html('<h1>Saving Data...</h1>')

        const body = {
            money: currentPlayer.money,
            bullets: currentPlayer.bullets,
            name: currentPlayer.name,
        };

        $.ajax({
            url: `${url}/${currentPlayer._id}`,
            headers: headers,
            method: 'PUT', 
            data: JSON.stringify(body),  
        })
        .then(handler)
        .then(() => loadPlayers())
        .catch(console.log);
    };

    function onReloadButtonClick() {
        $('#save').css('display', 'none');
        $('#reload').css('display', 'none');
        $('#notification').css('display', 'block');

        if(currentPlayer.money < 60) {
            console.log("Can't reload. Not enough money.");
            return;
        }

        currentPlayer.money -= 60;
        currentPlayer.bullets += 6;

        const body = {
            money: currentPlayer.money,
            bullets: currentPlayer.bullets,
            name: currentPlayer.name,
        };

        $.ajax({
            url: `${url}/${currentPlayer._id}`,
            headers: headers,
            method: 'PUT', 
            data: JSON.stringify(body),  
        })
        .then(handler)
        .then(() => {
            $('#save').css('display', '');
            $('#reload').css('display', '');
            $('#notification').css('display', 'none');
        })
        .catch(console.log);
    }

    $('#addPlayer').on('click', onAddPlayerButtonClick);
    $('#save').on('click', onSaveButtonClick);
    $('#reload').on('click', onReloadButtonClick);

    loadPlayers();
};