import styles from './BreachClassChip.module.css';

import { Chip } from '@material-ui/core';

// Fun little thing that helps display the BreachClasses and hights some of the more direct issues
const BreachClassChip = (props) => {

    const isDanger = props.label.toLowerCase().includes('password') ||
        props.label.toLowerCase().includes('email');

    return (
        <Chip
            label={props.label}
            size={props.size}
            color={isDanger ? 'secondary' : 'default'}
        />
    );
}

export default BreachClassChip;
