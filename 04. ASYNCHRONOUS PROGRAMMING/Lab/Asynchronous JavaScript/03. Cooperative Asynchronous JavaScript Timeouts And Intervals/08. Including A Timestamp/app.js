//The actual callback passed to the requestAnimationFrame() 
//function can be given a parameter too — a timestamp value 
//hat represents the time since the requestAnimationFrame() 
//started running.

//The general pattern you'd use looks something like this:
let startTime = null;

function draw(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    currentTime = timestamp - startTime;

    // Do something based on current time

    requestAnimationFrame(draw);
}

draw();