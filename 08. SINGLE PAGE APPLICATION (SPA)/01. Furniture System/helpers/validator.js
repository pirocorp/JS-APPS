const validator = function() {
    const formControlValidation = function (validationResult, selector, validationInfo) {
        const formInputElement = document.querySelector(selector);
        const formFeedback = formInputElement.parentElement.querySelector(".form-control-feedback");

        if (validationResult) {
            formInputElement.classList.add("is-invalid");
            formFeedback.textContent = validationInfo;
            formFeedback.style.display = '';
        } else {
            formInputElement.classList.add("is-valid");
            formInputElement.classList.remove("is-invalid");
            formFeedback.textContent = '';
            formFeedback.style.display = 'none';
        }

        return validationResult;
    };

    const addContextVariables = function (context) {
        context.loggedIn = userModel.isLogged();
        context.userInfo = storage.getData("userInfo");

        const parts = document.location.hash.split('/');
        const hash = parts[parts.length - 1];

        context[hash] = true;
    };

    return {
        formControlValidation,
        addContextVariables
    };
}();