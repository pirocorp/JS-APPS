//requestAnimationFrame()
//The modern version of setInterval(); executes a specified 
//block of code before the browser next repaints the display,
//allowing an animation to be run at a suitable framerate 
//regardless of the environment it is being run in.

//It was created in response to perceived problems with setInterval(),
//which for example doesn't run at a frame rate optimized for the device, 
//sometimes drops frames, continues to run even if the tab is not the
//active tab or the animation is scrolled off the page, etc

//we don't specify a time interval for requestAnimationFrame(); 
//it just runs it as quickly (up to 60 FPS) and smoothly as possible 
//in the current conditions.

//This is the general pattern you'll see it used in:
function draw() {
    // Drawing code goes here
    requestAnimationFrame(draw);
}

draw();

//The asynchronous code set up by these functions actually 
//runs on the main thread, but you are able to run other code 
//between iterations to a more or less efficient degree,
//depending on how processor intensive these operations are. 