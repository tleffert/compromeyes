import { useState, useEffect } from 'react';

import { TextField } from '@material-ui/core';

const ResultFilter = (props) => {

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        props.change(searchText);
    }, [searchText])

    return (
        <TextField id="standard-basic" label="Filter results"
            onChange={(event) => setSearchText(event.target.value)}
            value={searchText}
        />
    );
}

export default ResultFilter;
