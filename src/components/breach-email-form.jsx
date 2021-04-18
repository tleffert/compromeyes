import { useState } from 'react';

import { TextField, Button, Box } from '@material-ui/core';


const BreachEmailForm = (props) => {

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const [invalid, setInvalid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    const validateEmail = (emailInput) => {

        if (!emailInput || emailInput.length == 0) {
            setInvalid(true);
            setError('No email')
        }

        if (emailRegex.test(emailInput)) {
            setInvalid(false);
            setError('Invalid format');
        } else {
            setInvalid(true);
        }
        setEmail(emailInput);
    }

    const submitHandler = () => {
        props.submit(email);
    }

    return (
        <form>
        <Box display="flex" justifyContent="center">
            <Box>
                <TextField id="standard-basic" label="Email"
                    onChange={(event) => validateEmail(event.target.value)}
                    value={email}
                    error={invalid}
                    helperText={invalid ? error : ''}
                />
            </Box>
            <Box>
                <Button variant="contained" disabled={invalid || email.length == 0} onClick={submitHandler}>Submit</Button>
            </Box>
        </Box>
        </form>
    );

}

export default BreachEmailForm;
