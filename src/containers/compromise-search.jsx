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

    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        console.log("I'm the effect");
        setLoading(true);
        listBreaches(email).then(({data}) => {
            setResults(data.slice(0, 50));
            setLoading(false);
        });
    }, [email])

    return (
        <Fragment>
            <Box my={4}>
                <BreachEmailForm submit={(email) => setEmail(email)}/>
            </Box>
            <Box>
                <div>
                    {
                        loading ?
                            <Spinner /> :
                            <BreachResults data={results}/>
                    }
                </div>
            </Box>
        </Fragment>
    );
}

export default CompromiseSearch;
