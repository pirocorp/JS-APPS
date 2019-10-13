const btn = document.querySelector('button');

//Web workers allow you to send some of the JavaScript 
//processing off to a separate thread, called a worker, 
//so that you can run multiple JavaScript chunks simultaneously
const worker = new Worker('worker.js');

btn.addEventListener('click', () => {
    worker.postMessage('Go!');
    let pElem = document.createElement('p');
    pElem.textContent = 'This is a newly-added paragraph.';
    document.body.appendChild(pElem);
});

worker.onmessage = function (e) {
    console.log(e.data);
}