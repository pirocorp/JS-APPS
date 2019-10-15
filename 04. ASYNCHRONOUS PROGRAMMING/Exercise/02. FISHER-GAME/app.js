(() => {
    const elements = {
        loadBtn: document.querySelector('button.load'),
        addBtn: document.querySelector('button.add'),
        catches: document.getElementById('catches'),        
        angler: document.querySelector('#addForm input.angler'),
        weight: document.querySelector('#addForm input.weight'),
        species: document.querySelector('#addForm input.species'),
        location: document.querySelector('#addForm input.location'),
        bait: document.querySelector('#addForm input.bait'),
        captureTime: document.querySelector('#addForm input.captureTime'),
    };

    function resetCatches() {
        elements.catches.innerHTML = '';
    };

    function displayCatches(data) {
        resetCatches();

        let keys = Object.keys(data);
        //Descending sort by weight
        keys.sort((a, b) => data[b].weight - data[a].weight)

        for (const key of keys) {
            const currentCatch = createCatch(key, data[key]);
            elements.catches.appendChild(currentCatch);
        };
    };

    function onLoadBtnClick() {
        fetch('https://fisher-game.firebaseio.com/catches.json', {method: 'GET'})
            .then(handler)
            .then(displayCatches)
            .catch(console.log);
    };

    function addNewCatchToDom(response, newCatch) {
        if(!response.name) {
            return;
        }

        const currentCatch = createCatch(response.name, newCatch);
        elements.catches.appendChild(currentCatch);
    };

    function onAddBtnClick() {
        if( !elements.angler.value || 
            !elements.bait.value ||
            !elements.captureTime.value ||
            !elements.location.value ||
            !elements.species.value ||
            !elements.weight.value) {
                return;
            }

        const newCatch = {
            angler: elements.angler.value,
            bait: elements.bait.value,
            captureTime: elements.captureTime.value,
            location: elements.location.value,
            species: elements.species.value,
            weight: elements.weight.value,
        };

        //Add newCatch to the Database
        fetch('https://fisher-game.firebaseio.com/catches.json', {
            method: 'POST',
            body: JSON.stringify(newCatch),
        })
            .then(handler)
            //Add if successful add newCatch to DOM;
            .then(response => addNewCatchToDom(response, newCatch))
            .catch(console.log);
        

        elements.angler.value = '';
        elements.bait.value = '';
        elements.captureTime.value = '';
        elements.location.value = '';
        elements.species.value = '';
        elements.weight.value = '';
    };

    resetCatches();
    
    elements.loadBtn.addEventListener('click', onLoadBtnClick);
    elements.addBtn.addEventListener('click', onAddBtnClick);
})();