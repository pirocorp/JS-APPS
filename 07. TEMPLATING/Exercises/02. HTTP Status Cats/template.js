(() => {
    renderCatTemplate();

    //Render cat template and attach events
    function renderCatTemplate() {
        const templateString = document.getElementById("cat-template").textContent;
        const templateFunc = Handlebars.compile(templateString);
        const allCats = document.getElementById('allCats');
        allCats.innerHTML = templateFunc({ cats });
          
        allCats.addEventListener("click", onShowStatusCodeClick);

        function getCardParent(element) {
            const className = "info";
            let node = element.parentElement;

            while (node != null) {
                if (node.classList.contains(className)) {
                    return node;
                }

                node = node.parentElement;
            }

            return node;
        };

        function onShowStatusCodeClick({ target }) {
            if(!target.classList.contains('showBtn')) {
                return;
            }

            const card = getCardParent(target);      
            const status = card.querySelector('.status');
            status.style.display = status.style.display ? '' : 'none';
        }
    } 
})();