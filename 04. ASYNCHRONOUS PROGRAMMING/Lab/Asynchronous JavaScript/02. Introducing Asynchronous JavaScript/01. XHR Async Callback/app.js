function loadAsset(url, type, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;

    xhr.onload = function () {
        callback(xhr.response);
    };

    xhr.send();
};

function displayImage(blob) {
    let objectURL = URL.createObjectURL(blob);
    
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
};

//displayImage in this case is callback function
//old-style asynchronous code style callbacks
loadAsset('coffee.jpg', 'blob', displayImage);