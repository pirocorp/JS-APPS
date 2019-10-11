//this function will execute when document is ready
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

    async function loadPosts() {
        const postsEndpoint = 'posts/';

        $posts.empty();
        $posts.append($('<option>Loading...</option>'));
        $posts.prop('disabled', true);

        let data;

        try {
            //Request all posts from database and display their titles in <select>
            data = await request(postsEndpoint);
        } catch(reason) {
            handleError(reason);
        }

        $posts.empty();

        for (let post of data) {
            $('<option>')
                .text(post.title)
                .val(post._id)
                .appendTo($posts);
        }

        if (data.length !== 0) {
            onPostChange();
        } else {
            $posts.prop('disabled', false);
        }
    };

    async function onPostChange() {
        $posts.prop('disabled', true);
        $content.empty();
        $content.append('<span><i>Loading...</i></span>')

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

            if (comments.length === 0) {
                list.append($('<li><i>No comments yet</i></li>'));
            }

            $content.append(list);
        };

        let postPromise = request(postEndpoint);
        let commentsPromise = request(commentsEndpoint);

        //Here always will NOT work because the promise is NOT jQuery Promise

        try {
            let [data, comments] = await Promise.all([postPromise, commentsPromise]);
            displayPost([data, comments]);
        } catch (reason) {
            handleError(reason)
        } finally {
            $posts.prop('disabled', false);
        }
    };

    loadPosts();

    //Attach event listeners
    $posts.on('change', onPostChange)
});