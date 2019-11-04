const recipeModel = (function() {
    const create = function(data) {
        return requester.post('recipes', 'appdata', 'Kinvey', data);
    };

    const getAll = function() {
        return requester.get('recipes', 'appdata', 'Kinvey');
    };

    const get = function(id) {
        return requester.get(`recipes/${id}`, 'appdata', 'Kinvey');
    };

    return {
        create,
        getAll,
        get
    };
})();