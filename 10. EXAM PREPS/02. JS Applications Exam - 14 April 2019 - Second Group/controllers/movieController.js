const movieController = (function() {
    const getCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        helper.loadPartials(context)
            .then(function() {
                this.partial('../views/movie/create.hbs');
            })
    };

    const postCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        let { title, description, imageUrl, genres, tickets } = context.params;

        tickets = Number(tickets);
        genres = genres.split(', ').filter(x => x !== '');

        const data = {
            title,
            description,
            imageUrl,
            genres,
            tickets
        };

        requester.post('movies', 'appdata', 'Kinvey', data)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            })
            .catch(console.log);
    };

    const getCinema = async function(context) {
        helper.addHeaderInfo(context);
        //Sorts by tickets desc
        const sortCriteria = '"tickets":-1';
        const endpoint = `movies?query={}&sort={${sortCriteria}}`

        context.movies = await requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .catch(console.log);

        helper.loadPartials(context, {
            movieItem: '../views/movie/movieItem.hbs',
            movieInfo: '../views/movie/movieInfo.hbs',
            commonButtons: '../views/movie/commonMovieButtons.hbs',
        })
        .then(function () {
            this.partial('../views/movie/cinema.hbs');
        });
    };

    const getMyMovies = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        //Sorts by tickets desc
        const sortCriteria = '"tickets":1';
        //Will get only movies which are created by current logged user
        const filterCriteria = `"_acl.creator":"${sessionStorage.getItem('userId')}"`;
        const endpoint = `movies?query={${filterCriteria}}&sort={${sortCriteria}}`

        context.movies = await requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .catch(console.log);

        helper.loadPartials(context, {
            myMovieItem: '../views/movie/myMovieItem.hbs',
            movieInfo: '../views/movie/movieInfo.hbs',
            commonButtons: '../views/movie/commonMovieButtons.hbs',
        })
        .then(function () {
            this.partial('../views/movie/myMovies.hbs');
        });        
    }

    const getDetails = async function (context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        const { id } = context.params;

        const endpoint = `movies/${id}`

        context.movie = await requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .catch(console.log);

        helper.loadPartials(context)
            .then(function() {
                this.partial('../views/movie/details.hbs');
            });
    };

    const getEdit = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        const { id } = context.params;

        const endpoint = `movies/${id}`;

        context.movie = await requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .catch(console.log);

        //context.movie.tickets = Number(context.movie.tickets);
        context.movie.genres = context.movie.genres.join(', ');

        helper.loadPartials(context)
            .then(function () {
                this.partial('../views/movie/edit.hbs');
            });
    };

    const postEdit = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        let { title, description, imageUrl, genres, tickets, id } = context.params;

        tickets = Number(tickets);
        genres = genres.split(', ').filter(x => x !== '');

        const data = {
            title,
            description,
            imageUrl,
            genres,
            tickets
        };

        const endpoint = `movies/${id}`;

        requester.put(endpoint, 'appdata', 'Kinvey', data)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            })
            .catch(console.log);
    };

    const getDelete = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        const { id } = context.params;
        const endpoint = `movies/${id}`;

        context.movie = await requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .catch(console.log);

        //context.movie.tickets = Number(context.movie.tickets);
        context.movie.genres = context.movie.genres.join(', ');

        helper.loadPartials(context)
            .then(function () {
                this.partial('../views/movie/delete.hbs');
            });
    };

    const postDelete = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        const { id } = context.params;

        const endpoint = `movies/${id}`;

        requester.del(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            })
            .catch(console.log);
    };

    const getBuyTicket = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        const { id } = context.params;
        
        const endpoint = `movies/${id}`

        const movie = await requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .catch(console.log);

        movie.tickets = movie.tickets - 1;

        requester.put(endpoint, 'appdata', 'Kinvey', movie)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            })
            .catch(console.log);
    };

    return {
        getCreate,
        postCreate,
        getCinema,
        getMyMovies,
        getDetails,
        getEdit,
        postEdit,
        getDelete,
        postDelete,
        getBuyTicket
    };
})();