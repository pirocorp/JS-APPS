const causeModel = (function() {
    const create = function(data) {
        return requester.post('causes', 'appdata', 'Kinvey', data);
    };

    const getAll = function() {
        return requester.get('causes', 'appdata', 'Kinvey');
    };

    const get = function(id) {
        return requester.get(`causes/${id}`, 'appdata', 'Kinvey');
    };

    const update = function(id, data) {
        return requester.put(`causes/${id}`, 'appdata', 'Kinvey', data);
    };

    const del = function(id) {
        return requester.del(`causes/${id}`, 'appdata', 'Kinvey');
    };

    return {
        create,
        getAll,
        get,
        update,
        del
    };
})();