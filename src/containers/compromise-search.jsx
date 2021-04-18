import { useState, useEffect, Fragment } from 'react';

import { Box } from '@material-ui/core';

import { listBreaches } from '../shared/apis/breachApi';

import BreachResults from '../components/breach-results/BreachResults';
import BreachEmailForm from '../components/breach-email-form';
import Spinner from '../components/UI/Spinner/Spinner';

const CompromiseSearch = (props) => {

    const [email, setEmail] = useState('');

    const [results, setResults] = useState([]);

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
    }, [email])

    return (
        <Fragment>
            <Box my={4}>
                <BreachEmailForm submit={(email) => setEmail(email)}/>
            </Box>
            <Box>
                {
                    loading ?
                        <Spinner /> :
                        <BreachResults data={results}/>
                }
            </Box>
        </Fragment>
    );
}

export default CompromiseSearch;
