import { useState } from 'react';

import { TextField, Button } from '@material-ui/core';

import { listBreaches } from '../shared/apis/breachApi';

import BreachResults from '../components/breach-results/BreachResults';
import Spinner from '../components/UI/Spinner/Spinner';

const CompromiseSearch = (props) => {

    const [email, setEmail] = useState('');

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const [invalid, setInvalid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    const handleEmailChange = () => {
        setLoading(true);
        // TODO api call for data - debounce changes
        listBreaches(email).then(({data}) => {
            setResults(data.slice(0, 50));
            setLoading(false);
        });
    }

    const validateEmail = (emailInput) => {

        if (!emailInput || emailInput.length == 0) {
            setInvalid(true);
        }

        if (emailRegex.test(emailInput)) {
            setInvalid(false);
            setEmail(emailInput);
        } else {
            setInvalid(true);
        }
        setEmail(emailInput);
    }

    return (
        <div>
            <form>
                <TextField id="standard-basic" label="Email"
                    onChange={(event) => validateEmail(event.target.value)}
                    value={email}
                    error={invalid}
                    helperText={invalid? 'Incorrect format' : ''}
                />
            <Button variant="contained" disabled={invalid} onClick={handleEmailChange}>Submit</Button>
            </form>
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
