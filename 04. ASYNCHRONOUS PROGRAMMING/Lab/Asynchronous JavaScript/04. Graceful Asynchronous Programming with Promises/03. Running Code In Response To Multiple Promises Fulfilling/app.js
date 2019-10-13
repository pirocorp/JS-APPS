//return value of the function is promise returned by blob() or text()
//The code inside the function body is async and promise-based, 
//therefore in effect the entire function acts like a promise — convenient.
function fetchAndDecode(url, type) {
    return fetch(url)
        .then(response => {
            if (type === 'blob') {
                return response.blob();
            } else if (type === 'text') {
                return response.text();
            }
        })
        .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
};

let coffee = fetchAndDecode('coffee.jpg', 'blob');
let tea = fetchAndDecode('tea.jpg', 'blob');
let description = fetchAndDecode('description.txt', 'text');

//The .all() block will still fulfill, but just won't display 
//the resources that had problems.If you wanted the.all to reject,
//you'd have to chain the .catch() block on to the end of there instead.
Promise.all([coffee, tea, description])
    .then(values => {
        console.log(values);
        // Store each value returned from the promises in separate variables; create object URLs from the blobs
        let objectURL1 = URL.createObjectURL(values[0]);
        let objectURL2 = URL.createObjectURL(values[1]);
        let descText = values[2];

        // Display the images in <img> elements
        let image1 = document.createElement('img');
        let image2 = document.createElement('img');
        image1.src = objectURL1;
        image2.src = objectURL2;
        document.body.appendChild(image1);
        document.body.appendChild(image2);

        // Display the text in a paragraph
        let para = document.createElement('p');
        para.textContent = descText;
        document.body.appendChild(para);
    });