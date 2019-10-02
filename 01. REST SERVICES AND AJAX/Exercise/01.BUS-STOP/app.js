function getInfo() {
    const host = 'https://judgetests.firebaseio.com/businfo/';
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    let url = host + stopId.value + '.json';

    function displayRepos(data) {
        stopName.textContent = data.name;

        buses.innerHTML = '';

        for (const key in data.buses) {
            const time = data.buses[key];
            const li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${time} minutes`;
            buses.appendChild(li);
        }
    };

    function displayError(err) {
        console.log(err);
        stopName.textContent = '';
        stopName.textContent = 'Error';
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayRepos(data))
        .catch((err) => displayError(err))
}