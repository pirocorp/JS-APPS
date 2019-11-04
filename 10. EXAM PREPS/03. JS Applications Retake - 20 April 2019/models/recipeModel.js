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

    const update = function (id, data) {
        return requester.put(`recipes/${id}`, 'appdata', 'Kinvey', data);
    };

    const del = function(id) {
        return requester.del(`recipes/${id}`, 'appdata', 'Kinvey');
    };

    return {
        create,
        getAll,
        get,
        update,
        del,
    };
})();