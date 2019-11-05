const offerModel = (function() {
    const create = function(data) {
        return requester.post('offers', 'appdata', 'Kinvey', data);
    };

    const getAll = function() {
        return requester.get('offers', 'appdata', 'Kinvey');
    };

    const get = function(id) {
        return requester.get(`offers/${id}`, 'appdata', 'Kinvey');
    };

    const update = function(id, data) {
        return requester.put(`offers/${id}`, 'appdata', 'Kinvey', data);
    };

    const del = function(id) {
        return requester.del(`offers/${id}`, 'appdata', 'Kinvey');
    }

    return {
        create,
        getAll,
        get,
        update,
        del
    };
})();