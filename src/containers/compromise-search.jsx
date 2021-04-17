import { useState } from 'react';

import { TextField } from '@material-ui/core';

import { listBreaches } from '../shared/apis/breachApi';

import BreachResults from '../components/breach-results/BreachResults';
import Spinner from '../components/UI/Spinner/Spinner';

const CompromiseSearch = (props) => {

    const [email, setEmail] = useState('');

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleEmailChange = (email) => {
        setLoading(true);
        setEmail(email);
        // TODO api call for data - debounce changes
        listBreaches(email).then(({data}) => {
            setResults(data);
            setLoading(false);
        });
    }

    return (
        <div>
            <div>
                <TextField id="standard-basic" label="Standard"
                    onChange={(event) => handleEmailChange(event.target.value)}
                    value={email}
                />
            </div>
            <div>
                {
                    loading ?
                        <Spinner /> :
                        <BreachResults data={results}/>
                }
            </div>
        </div>
    );
}

export default CompromiseSearch;
