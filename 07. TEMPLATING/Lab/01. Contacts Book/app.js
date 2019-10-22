//ASYNC IIFE which starts on document ready
(async function() {
    const { registerPartial, getTemplateFunc } = window.templates

    let cardsListFunc;

    //with await Promise.all we make all requests go in parallel 
    await Promise.all([
        registerPartial('card', 'card'),
        cardsListFunc = await getTemplateFunc('cards-list')
    ]);

    //this way AJAX calls are sequential
    //await registerPartial('card', 'card');
    //cardsListFunc = await getTemplateFunc('cards-list');

    function getCardParent(element) {
        const className = "contact";
        let node = element.parentElement;

        while(node != null) {
            if(node.classList.contains(className)) {                
                return node;
            }

            node = node.parentElement;
        }

        return node;
    };

    function onDetailsBtnClick({ target }) {
        if(!target.classList.contains('detailsBtn')) {
            return;
        }
        
        const card = getCardParent(target);
        const details = card.querySelector('.details');
        details.style.display = details.style.display ? '' : 'none';
    };

    //renders result of cardsListFunc
    document.getElementById('contacts').innerHTML = cardsListFunc({ contacts });
    
    //attach event handler for all buttons
    document.getElementById('contacts')
        .addEventListener("click", onDetailsBtnClick)
})();