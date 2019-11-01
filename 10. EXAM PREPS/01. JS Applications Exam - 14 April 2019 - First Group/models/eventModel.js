const eventModel = (function() {

    const createEvent = function(data) {
        const endPoint = `/appdata/${storage.appKey}/events`;

        const request = {
            body: JSON.stringify(data),
        };

        return requester.post(endPoint, request);
    };

    const getAllEvents = function() {
        const endPoint = `/appdata/${storage.appKey}/events`;

        return requester.get(endPoint, {});
    };

    const getEventDetails = function(id) {
        const endPoint = `/appdata/${storage.appKey}/events/${id}`; 

        return requester.get(endPoint, {});
    };

    const editEvent = function(id, data) {
        const endPoint = `/appdata/${storage.appKey}/events/${id}`; 

        const request = {
            body: JSON.stringify(data),
        };

        return requester.put(endPoint, request);
    };

    const deleteEvent = function(id) {
        const endPoint = `/appdata/${storage.appKey}/events/${id}`;

        return requester.del(endPoint, {});
    };

    return {
        createEvent,
        getAllEvents,
        getEventDetails,
        editEvent,
        deleteEvent,
    };
})();