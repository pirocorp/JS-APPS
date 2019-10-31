//Shows notifications 
const notificator = (function() {
    const showError = function(message) {
        const selector = '#errorBox';
        renderNotificationElement(selector, message);
    };

    const showInfo = async function (message) {
        const selector = '#successBox';
        //Hack
        setTimeout(() => renderNotificationElement(selector, message), 200);
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
        }, timeSpan);
    };

    return {
        showError,
        showInfo,
        showLoading,
        hideLoading
    };
})();