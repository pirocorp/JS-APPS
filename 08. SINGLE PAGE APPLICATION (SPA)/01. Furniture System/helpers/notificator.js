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
        notificationElement.classList.add('fade-in');
        notificationElement.style.display = '';

        setTimeout(() => {            
            notificationElement.classList.remove('fade-in');
            notificationElement.classList.add('fade-out');
        }, 2500);

        setTimeout(() => {
            notificationElement.textContent = '';
            notificationElement.classList.remove('fade-out');
            notificationElement.style.display = 'none';
        }, timeSpan);
    };

    return {
        showError,
        showInfo,
    };
})();