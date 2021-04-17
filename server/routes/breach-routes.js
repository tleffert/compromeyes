const express = require('express');
const axios = require('axios');

module.exports = (parentRoute) => {
    let breachRouter = express.Router();

    parentRoute.use('/breaches', breachRouter);

    breachRouter.get('/', (req, res) => {
        axios.get(
            `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURI(req.query.email)}`,
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
