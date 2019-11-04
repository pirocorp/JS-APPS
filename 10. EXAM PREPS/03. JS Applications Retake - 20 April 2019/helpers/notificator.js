//Shows notifications 
const notificator = (function() {
    let notificationMessage = null;

    const createNotificationMessage = function(message, callback) {
        notificationMessage = {
            text: message,
            action: callback,
        };
    };

    const showNotificationMessage = function() {
        if(notificationMessage) {
            notificationMessage.action(notificationMessage.text);
        }        
    };

    const showError = function(message) {
        const selector = '#errorBox';
        renderNotificationElement(selector, message);
    };

    const showInfo = async function (message) {
        const selector = '#successBox';
        renderNotificationElement(selector, message);
    };

    const showLoading = function(message) {
        if(!message) {
            message = 'Loading...';
        }

        const selector = '#loadingBox';

        const notificationElement = document.querySelector(selector);

        notificationElement.textContent = message;
        notificationElement.classList.add('fade-in');
        notificationElement.style.display = 'block';
    };

    const hideLoading = function() {
        const selector = '#loadingBox';
        const notificationElement = document.querySelector(selector);

        notificationElement.classList.remove('fade-in');
        notificationElement.classList.add('fade-out');

        setTimeout(() => {
            notificationElement.textContent = '';
            notificationElement.classList.remove('fade-out');
            
            notificationElement.style.display = '';
        });
    };

    //Renders notifications
    function renderNotificationElement(selector, message) {
        const timeSpan = 3000;

        const notificationElement = document.querySelector(selector);

        if (!notificationElement) {
            return;
        }

        notificationElement.textContent = message;
        notificationElement.classList.add('fade-in');
        
        notificationElement.style.display = 'block';

        setTimeout(() => {            
            notificationElement.classList.remove('fade-in');
            notificationElement.classList.add('fade-out');
        }, 2500);

        setTimeout(() => {
            notificationElement.textContent = '';
            notificationElement.classList.remove('fade-out');
            
            notificationElement.style.display = '';
            notificationMessage = null;
        }, timeSpan);
    };

    return {
        showError,
        showInfo,
        showLoading,
        hideLoading,
        createNotificationMessage,
        showNotificationMessage,
    };
})();