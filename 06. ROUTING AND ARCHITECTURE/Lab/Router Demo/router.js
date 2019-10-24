//callback is attached on document ready event
$(() => {
    //kvp -> route <-> content
    const content = {
        home: '<h2>Home Page</h2>',
        about: '<h2>About Page</h2>',
        contacts: '<h2>Contacts Page</h2>',
    };

    const main = $('#main');

    //loads content for given route
    function loadContent() {
        //get route from browser address bar
        let hash = location.hash.substr(2);

        //default route
        if(hash === '') {
            hash = 'home';
            location.hash = '#/' + hash;
        }

        //if has content for this route display it
        if(content.hasOwnProperty(hash)) {
            main.html(content[hash]);
        } else {
            //not found content
            main.html('<h2>404 Not Found</h2>');
        }
    };

    //router is attached to hashchange event and on every change 
    //content is changed against current hash
    $(window).on('hashchange', loadContent);

    loadContent();
});

