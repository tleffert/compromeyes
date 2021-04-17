import { useState } from 'react';

import { TextField } from '@material-ui/core';

import { listBreaches } from '../shared/apis/breachApi';

const CompromiseSearch = (props) => {

    const [email, setEmail] = useState('');

    const [results, setResults] = useState([]);

    const handleEmailChange = (email) => {
        setEmail(email);
        // TODO api call for data - debounce changes
        listBreaches(email).then(data => console.log(data));
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
                    // TODO add results table
                }
            </div>
        </div>
    );
}

export default CompromiseSearch;
