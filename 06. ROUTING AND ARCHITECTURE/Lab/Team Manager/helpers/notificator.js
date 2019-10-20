const notificator = (function() {
    const showError = function(message) {
        const selector = '#errorBox';
        renderNotificationElement(selector, message);
    };

    const showInfo = function (message) {
        const selector = '#infoBox';
        renderNotificationElement(selector, message);
    };

    function renderNotificationElement(selector, message, timeSpan) {
        if(!timeSpan) { timeSpan = 2000 };

        const errorBoxElement = document.querySelector(selector);

        errorBoxElement.textContent = message;
        errorBoxElement.disabled = false;
        errorBoxElement.style.display = 'block';

        setTimeout(() => {
            errorBoxElement.textContent = '';
            errorBoxElement.disabled = true;
            errorBoxElement.style.display = '';
        }, timeSpan);
    };

    return {
        showError,
        showInfo,
    };
})();