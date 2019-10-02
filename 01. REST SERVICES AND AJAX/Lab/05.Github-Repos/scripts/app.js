function loadRepos() {    
    const reposElement = document.getElementById("repos");
    reposElement.innerHTML = '';

    const username = document.getElementById("username").value;

    let url = "https://api.github.com/users/" + username + "/repos";

    function createRepo(name, url) {
        let link = document.createElement('a');
        link.textContent = name;
        link.setAttribute('href', url);

        let item = document.createElement('li');
        item.appendChild(link);       

        return item;
    }

    function displayRepos(repoItems) {
        for (let repo of repoItems) {
            const { full_name, html_url } = repo;
            const repoItem = createRepo(full_name, html_url);
            reposElement.appendChild(repoItem)            
        }
    }

    function displayError(err) {
        console.log(err);
        document.getElementById('repos').innerHTML = "<li>Error</li>";
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayRepos(data))
        .catch((err) => displayError(err))
}