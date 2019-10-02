function solve() {
    const departButton = document.querySelector('#depart');
    const arriveButton = document.querySelector('#arrive');
    const infoElement = document.querySelector('#info span');

    function getHost(currentId) {
        return host = `https://judgetests.firebaseio.com/schedule/${currentId}.json`;
    }

    let currentHost = getHost('depot');
    let currentStop = '';

    function depart() {
        departButton.disabled = true;
        arriveButton.disabled = false;

        fetch(currentHost)
            .then((response) => response.json())
            .then((data) => success(data))
            .catch((data) => error(data));

        function success(data) {
            currentStop = data.name;
            infoElement.textContent = `Next stop ${currentStop}`;
            currentHost = getHost(data.next);
        }

        function error(data) {
            console.log(data);
        };
    };

    function arrive() {
        departButton.disabled = false;
        arriveButton.disabled = true;

        infoElement.textContent = `Arriving at ${currentStop}`;
    };

    return {
        depart,
        arrive
    };
}   

let result = solve();