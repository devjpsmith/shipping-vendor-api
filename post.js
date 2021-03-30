const axios = require('axios');

axios
    .post(
        'http://localhost:3000/1',
        { name: 'John Doe', occupation: 'gardener' },
        { headers: { 'Content-Type': 'application/json' } }
    )
    .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
    })
    .catch(error => {
        console.error(error);
    });

axios
    .post(
        'http://localhost:3000/2',
        { name: 'John Doe', occupation: 'gardener' },
        { headers: { 'Content-Type': 'application/json' } }
    )
    .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
    })
    .catch(error => {
        console.error(error);
    });

axios
    .post(
        'http://localhost:3000/3',
        '<xml><source>mySource</source></xml>',
        { headers: { 'Content-Type': 'application/xml' } }
    )
    .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
    })
    .catch(error => {
        console.error(error);
    });