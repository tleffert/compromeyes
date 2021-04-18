import { Fragment, useState } from 'react';

import {TableRow, TableCell, Collapse, IconButton, Box, Typography, Chip } from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const CollapseRow = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.row.Title}
                </TableCell>
                <TableCell>{props.row.Domain}</TableCell>
                <TableCell>{props.row.PwnCount}</TableCell>
                <TableCell>{props.row.BreachDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box m={1}>
                            <Box mb={2}>
                                {props.row.DataClasses.map(breachClass => {
                                       return (
                                           <Chip
                                               size="small"
                                               key={`${props.row.Name}-${breachClass}`}
                                               label={breachClass}
                                           />
                                       );
                                   })
                               }
                            </Box>
                            <Typography gutterBottom component="span">
                                {props.row.Description}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default CollapseRow;