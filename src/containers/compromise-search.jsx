import { useState, useEffect, Fragment } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import { Box, Grid } from '@material-ui/core';

import { listBreaches } from '../shared/apis/breachApi';

import BreachResults from '../components/breach-results/BreachResults';
import BreachEmailForm from '../components/breach-email-form';
import Spinner from '../components/UI/Spinner/Spinner';

const BREACHES = gql`
    query GetBreaches($email: String!) {
        breaches(email: $email) {
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

    // Setting up so that our query is only executed when needed
    const [getBreaches, {loading, data}] = useLazyQuery(BREACHES);

    useEffect(() => {
        if (data) {
            setResults(data.breaches);
        }
    }, [data]);

    useEffect(() => {
        if (email) {
            getBreaches({variables: {email: email}});
        }
    }, [email])

    const resultBox = (
        results || loading ?
            <Box width="75%">
                {
                    loading ?
                        <Spinner /> :
                        <BreachResults data={[...results]}/>
                }
            </Box>
        : null
    );

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            direction={results || loading ? 'column' : 'row'}
            style={{ minHeight: '90vh' }}
        >
            <Box my={results || loading ? 4 : 'auto'}>
                <BreachEmailForm submit={(email) => setEmail(email)}/>
            </Box>
            {resultBox}
        </Grid>
    );
}

export default CompromiseSearch;
