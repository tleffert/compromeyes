import { useState, useEffect, Fragment } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import { Box, Grid } from '@material-ui/core';

import { listBreaches } from '../shared/apis/breachApi';

import BreachResults from '../components/breach-results/BreachResults';
import BreachEmailForm from '../components/breach-email-form';
import Spinner from '../components/UI/Spinner/Spinner';

const BREACHES = gql`
    query GetBreaches {
        breaches(email: "test@test.com") {
            Name
            Title
            Domain
            BreachDate
            PwnCount
            DataClasses
            Description
        }
    }
`;

const CompromiseSearch = (props) => {

    const [email, setEmail] = useState('');

    const [results, setResults] = useState();

    // const [loading, setLoading] = useState(false);

    const [getBreaches, {loading, data}] = useLazyQuery(BREACHES);

    useEffect(() => {

        if (data) {
            setResults(data.breaches);
            console.log(data.breaches[0].DataClasses, data.breaches[0].DataClasses[0]);
        }


    }, [data]);

    useEffect(() => {
        console.log("ARE WE LOADING", loading);
    }, [loading]);

    const emailSubmitHandler = (email) => {
        getBreaches({variable: {email: email}});
    }

    const resultBox = (
        results || loading ?
            <Box width="75%">
                {
                    loading ?
                        <Spinner /> :
                        <BreachResults data={results}/>
                }
            </Box>
        : null
    );

    return (
        <Grid
            maxWidth="lg"
            container
            justify="center"
            alignItems="center"
            direction={results || loading ? 'column' : 'row'}
            style={{ minHeight: '90vh' }}
        >
            <Box my={results || loading ? 4 : 'auto'}>
                <BreachEmailForm submit={(email) => emailSubmitHandler(email)}/>
            </Box>
            {resultBox}
        </Grid>
    );
}

export default CompromiseSearch;
