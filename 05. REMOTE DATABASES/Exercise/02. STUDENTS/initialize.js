function initializeKinvey() {
    const students = [
        {
            id: '1',
            firstName: 'Isaac',
            lastName: 'Netero',
            facultyNumber: '900005878123',
            grade: '4.99',
        },
        {
            id: '2',
            firstName: 'George',
            lastName: 'Serie',
            facultyNumber: '900004560603',
            grade: '5.23',
        },
        {
            id: '3',
            firstName: 'Nvy',
            lastName: 'Ose',
            facultyNumber: '900001234567',
            grade: '6.00',
        },
        {
            id: '4',
            firstName: 'Sunny',
            lastName: 'Jackson',
            facultyNumber: '900003342331',
            grade: '4.40',
        },
        {
            id: '5',
            firstName: 'Aina',
            lastName: 'Haward',
            facultyNumber: '900001110011',
            grade: '5.56',
        },
    ];

    const studentPromises = [];

    //iterate through all elements of array and start AJAX call to Kinvey   
    //All AJAX calls are in parallel 
    students.forEach(currentStudent => {
        const request = {
            method: 'POST',
            headers: {
                authorization: 'Kinvey ' + authToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentStudent),
        };
    
        //same resolve logic for all promises -> in handler function
        const currentPromise = fetch(baseUrl, request)
            .then(handler)
            .catch(console.log);

        //push every promise onto array
        studentPromises.push(currentPromise);
    })

    //returns collection of promises and every promises knows how to resolves themselves
    //all promises resolves in parallel
    return Promise.all(studentPromises);
};

//function is declared as async because we need first to be loged in before manipulate data
//and must await promise returned by login function to resolve to authToken which is used to
//authentication for future requests  
async function initialize() {
    //waiting for login to finish and resolves to authToken
    authToken = await login();
    
    const request = {
        method: 'GET',
        headers: {
            authorization: 'Kinvey ' + authToken,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(baseUrl, request)
        .then(handler)
        .catch(console.log);

    //If database is already initialized initializeKinvey is skipped
    //and 'Already Initialized' is returned otherwise result from
    //initializeKinvey() is returned
    if(response.length === 0) {
        return initializeKinvey();
    } else {
        return 'Already Initialized';
    }
};