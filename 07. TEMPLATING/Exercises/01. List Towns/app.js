function attachEvents() {
    async function onClickLoadTownsBtn() {
        const towns = document.getElementById("towns")
            .value.split(", ").map(x => { return { name: x } });

        const response = await fetch('./towns-list-template.hbs');
        const templateString = await response.text();
        const templateFunc = Handlebars.compile(templateString);
        document.getElementById('root').innerHTML = templateFunc({ towns });
    }

    const loadTownsBtn = document.getElementById("btnLoadTowns");
    loadTownsBtn.addEventListener("click", onClickLoadTownsBtn);
}

attachEvents();