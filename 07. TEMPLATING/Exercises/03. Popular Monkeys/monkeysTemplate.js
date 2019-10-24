$(() => {
    const templateString = document.getElementById('monkey-template').textContent;
    const templateFunc = Handlebars.compile(templateString);

    const allMonkeys = document.querySelector('.monkeys');
    allMonkeys.innerHTML = templateFunc({ monkeys });

    allMonkeys.addEventListener("click", onInfoClick);

    function getParent(element) {
        const className = "monkey";
        let node = element.parentElement;

        while (node != null) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return node;
    };

    function onInfoClick({ target }) {
        if (!target.classList.contains('btn-info')) {
            return
        }

        const parent = getParent(target); 
        const info = parent.querySelector('.info');
        info.style.display = info.style.display ? '' : 'none';
    }
});