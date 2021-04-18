import { Fragment, useState, useEffect } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Chip, makeStyles, TextField, TableSortLabel,
    Grid, Box
} from '@material-ui/core';

import ResultFilter from './result-filter';
import Spinner from '../UI/Spinner/Spinner';
import CollapseRow from './CollapseRow';

import styles from './BreachResults.module.css';

const BreachResults = (props) => {

    const [data, setData] = useState(props.data);
    const [sortBy, setSortBy] = useState();
    const [sortDir, setSortDir] = useState('asc');
    const [updating, setUpdating] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setData(props.data.filter(item => {
            const itemName = item.Name.toLowerCase();
            return itemName.includes(searchText.toLowerCase());
        }));
    }, [searchText]);

    useEffect(() => {
        setData(sortString());
    }, [sortBy, sortDir]);

    const sortString = () => {
        let sortedData;
        if (sortDir === 'asc') {
            sortedData = data.sort((a, b) => {
                return a[sortBy] <= b[sortBy] ? 1 : -1;
            });
        } else {
            sortedData = data.sort((a, b) => {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            });
        }
        return sortedData;
    }

    const sortHandler = (sortProp, type) => {
        if (sortProp === sortBy) {
            // reverse sort dir
            sortDir === 'asc' ? setSortDir('desc') : setSortDir('asc');
        } else {
            // new sort option
            setSortBy(sortProp);
            setSortDir('asc');
        }
    }

    const headCells = [
        { id: 'Name', label: 'Site'},
        { id: 'Title', label: 'Title'},
        { id: 'PwnCount', label: 'Count', type: "number"},
        { id: 'BreachDate', label: 'Breach Date', type: "date"}
    ];

    return (
        <Fragment>
            <Box display="flex">
                <Box><ResultFilter change={(text) => setSearchText(text)}/></Box>
                <Box><Paper>{`${data.length} of ${props.data.length}`}</Paper></Box>
            </Box>
            <TableContainer component={Paper} className={styles.BreachResultTable}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                      <TableCell />
                    {
                        headCells.map((cell) => (
                            <TableCell
                                key={cell.id}
                                sortDirection={sortBy === cell.id ? sortDir : false}
                            >
                                <TableSortLabel
                                    active={sortBy === cell.id}
                                      direction={sortBy === cell.id ? sortDir : 'asc'}
                                      onClick={() => sortHandler(cell.id, cell.type | 'string')}
                                >
                                {cell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                     <CollapseRow row={row} key={row.Name}/>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Fragment>
    );
}

export default BreachResults;
