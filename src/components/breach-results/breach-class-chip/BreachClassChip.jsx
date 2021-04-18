import styles from './BreachClassChip.module.css';

import { Chip } from '@material-ui/core';


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
