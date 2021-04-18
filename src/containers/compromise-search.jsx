import { useState, useEffect, Fragment } from 'react';

import { Box, Grid } from '@material-ui/core';

import { listBreaches } from '../shared/apis/breachApi';

import BreachResults from '../components/breach-results/BreachResults';
import BreachEmailForm from '../components/breach-email-form';
import Spinner from '../components/UI/Spinner/Spinner';

const CompromiseSearch = (props) => {

    const [email, setEmail] = useState('');

    const [results, setResults] = useState();

    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        // mostly to skip first render
        if (!email) return;

        setLoading(true);
        try {
            const {data} = await listBreaches(email);
            setResults(data);
        } catch (err) {
            // Something bad happened
        } finally {
            setLoading(false);
        }
    }, [email]);

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
                <BreachEmailForm submit={(email) => setEmail(email)}/>
            </Box>

            {resultBox}
        </Grid>
    );
}

export default CompromiseSearch;
