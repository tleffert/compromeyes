import { useState } from 'react';

import { TextField } from '@material-ui/core';


const CompromiseSearch = (props) => {

    const [email, setEmail] = useState('');

    const handleEmailChange = (email) => {
        setEmail(email);
        // TODO api call for data - debounce changes
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
