//Shows notifications 
const notificator = (function() {
    const showError = function(message) {
        const selector = '#errorBox';
        renderNotificationElement(selector, message);
    };

    const showInfo = function (message) {
        const selector = '#infoBox';
        renderNotificationElement(selector, message);
    };

    //Renders notifications
    function renderNotificationElement(selector, message) {
        const timeSpan = 3000;

        const notificationElement = document.querySelector(selector);

        notificationElement.textContent = message;
        //custom fade in css animation
        notificationElement.classList.add('fade-in');
        notificationElement.disabled = false;
        notificationElement.style.display = 'block';

        setTimeout(() => {            
            notificationElement.classList.remove('fade-in');
            //custom fade out css animation
            notificationElement.classList.add('fade-out');
        }, 2500);

        setTimeout(() => {
            notificationElement.textContent = '';
            notificationElement.classList.remove('fade-out');
            
            notificationElement.disabled = true;
            notificationElement.style.display = '';
        }, timeSpan);
    };

    return {
        showError,
        showInfo,
    };
})();