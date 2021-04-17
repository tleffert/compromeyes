import { useState } from 'react';

import { TextField, Button } from '@material-ui/core';


const BreachEmailForm = (props) => {

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const [invalid, setInvalid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

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

    const submitHandler = () => {
        props.submit(email);
    }

    return (
        <form>
            <TextField id="standard-basic" label="Email"
                onChange={(event) => validateEmail(event.target.value)}
                value={email}
                error={invalid}
                helperText={invalid ? 'Incorrect format' : ''}
            />
            <Button variant="contained" disabled={invalid} onClick={submitHandler}>Submit</Button>
        </form>
    );

}

export default BreachEmailForm;
