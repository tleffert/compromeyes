import React, { Fragment, useState } from 'react';

import {TableRow, TableCell, Collapse, IconButton, Box, Typography, Chip } from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import BreachClassChip from './breach-class-chip/BreachClassChip';

// Cool extension of just a normal table row, allows us to click to extend the table row for more info
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
                    {props.row.Name}
                </TableCell>
                <TableCell>{props.row.Title}</TableCell>
                <TableCell>{props.row.PwnCount}</TableCell>
                <TableCell>{props.row.BreachDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box m={1}>
                            <Box mb={2}>
                                <span>Domain: </span>
                                <span>{props.row.Domain}</span>
                            </Box>
                            <Box mb={2}>
                                <span>Danger: </span>
                                {props.row.DataClasses.map(breachClass => {
                                       return (
                                           <BreachClassChip
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

export default React.memo(CollapseRow);
