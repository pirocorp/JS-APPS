const furnitureModel = function() {
    const create = function(params) {
        if (!userModel.isLogged()) {
            return Promise.reject("You must be logged in.");
        }

        const endpoint = `/appdata/${storage.appKey}/furnitures`;

        const { make, model, year, description, price, image, material } = params;

        const data = {
            make: make, 
            model: model,
            year: Number(year),
            description: description,
            price: Number(price), 
            image: image,
            material: material,
        };       

        const request = {
            body: JSON.stringify(data),
        };

        return requester.post(endpoint, request);
    };

    const getAll = function() {
        if (!userModel.isLogged()) {
            return Promise.reject("You must be logged in.");
        }

        const endPoint = `/appdata/${storage.appKey}/furnitures`;
        return requester.get(endPoint, {});
    };

    const getFurniture = function(id) {
        if (!userModel.isLogged()) {
            return Promise.reject("You must be logged in.");
        }

        const endPoint = `/appdata/${storage.appKey}/furnitures/${id}`;
        return requester.get(endPoint, {});
    };

    const deleteFurniture = function(id) {
        if (!userModel.isLogged()) {
            return Promise.reject("You must be logged in.");
        }

        const endPoint = `/appdata/${storage.appKey}/furnitures/${id}`;
        return requester.del(endPoint, {});
    };

    return {
        create,
        getAll,
        getFurniture,
        deleteFurniture
    };
}();