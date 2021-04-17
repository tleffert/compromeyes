const express = require('express');
const axios = require('axios');

module.exports = (parentRoute) => {
    let breachRouter = express.Router();

    parentRoute.use('/breaches', breachRouter);

    breachRouter.get('/', (req, res) => {
        // req.params.email
        axios.get(
            `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURI('test@test.com')}`,
            {
                headers: {
                    'hibp-api-key': '',
                    'user-agent': 'compromeyes'
                }
            }
        ).then(({data}) => {
            res.json(data).end();
        });
    })
}
