let postsElement = document.getElementById('posts');
let allPosts = [];

function displayPostTitles(data) {
    //When using fragments all elements attached to fragment 
    //are not attached to dom directly but they are attached all at once when
    //fragment is attached to DOM fragment has greater performance
    let fragment = document.createDocumentFragment();    

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            allPosts.push(element);

            let option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.title;

            fragment.appendChild(option);
        }
    }

    postsElement.innerHTML = '';
    postsElement.appendChild(fragment);
};

function onLoadPostsButtonClick() {
    fetch("https://blog-apps-c12bf.firebaseio.com/posts.json")
        .then(response => response.json())
        .then(displayPostTitles);
};

function displayPost(post) {
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;
};

function displayComments(data, postId) {
    const commentsElement = document.getElementById('post-comments');
    commentsElement.innerHTML = '';

    data = Object.keys(data).map((key) => data[key]);
    data = data.filter(x => x.postId === postId);

    const fragment = document.createDocumentFragment();

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            const li = document.createElement('li');
            li.textContent = element.text;
            fragment.appendChild(li);
        }
    }

    commentsElement.appendChild(fragment);
};

function onViewPostButtonClick() {
    let postId = postsElement.value;
    
    for (let i = 0; i < allPosts.length; i++) {
        const element = allPosts[i];
        
        if(element.id === postId) {
            displayPost(element);

            fetch("https://blog-apps-c12bf.firebaseio.com/comments.json")
                .then(response => response.json())
                .then((data) => displayComments(data, postId));
            
            return;
        }
    }
};

function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', onLoadPostsButtonClick);
    document.getElementById('btnViewPost').addEventListener('click', onViewPostButtonClick);
};

attachEvents();