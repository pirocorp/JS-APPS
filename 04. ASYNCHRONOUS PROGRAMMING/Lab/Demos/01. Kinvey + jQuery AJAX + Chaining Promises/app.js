//This function will execute when document is ready
$(() => {
    //Application settings
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_HJnsQpaOH/';
    const username = 'pesho';
    const password = 'p';

    //DOM Elements
    const $posts = $('#posts');
    const $content = $('#content');

    function handleError(reason) {
        console.log(reason);
    };

    function request(endpoint) {
        return $.ajax({
            url: baseUrl + endpoint,
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`)
            }
        });
    };

    function onButtonLoadClick() {
        const postsEndpoint = 'posts/';
        
        function fillSelect(data) {
            $posts.empty();

            for(let post of data) {
                $('<option>')
                    .text(post.title)
                    .val(post._id)
                    .appendTo($posts);
            }
        };

        //Request all posts from database and display their titles in <select>
        request(postsEndpoint)
            .then(fillSelect)
            .catch(handleError);
    };

    function onButtonViewClick() {
        const postId = $posts.find('option:selected').val();
        const postEndpoint = 'posts/' + postId;
        const commentsEndpoint = `comments/?query={"postId":"${postId}"}`;

        //Display post body and comments
        function displayPost([data, comments]) {
            $content.empty();
            $content.append($(`<h1>${data.title}</h1>`));
            $content.append($(`<p>${data.body}</p>`));
            $content.append($(`<h3>Comments</h3>`));
            
            let list = $('<ul>');

            for (const comment of comments) {
                list.append($(`<li>${comment.text}</li>`));
            }
            
            if(comments.length === 0) {
                list.append($('<li><i>No comments yet</i></li>'));
            }

            $content.append(list);
        };

        //Request all associated comments
        function requestComments(data) {
            return new Promise(function (resolve, reject) {
                request(commentsEndpoint)
                    .then((response) => resolve([data, response]))
                    .catch((reason) => reject(reason));
            });
        };

        //Request only selected post from database 
		//Chaining Promises
        request(postEndpoint)
            .then(requestComments)
            .then(displayPost)
            .catch(handleError);
    };

    //Attach event listeners
    $('#btnLoad').click(onButtonLoadClick);
    $('#btnView').click(onButtonViewClick)
});