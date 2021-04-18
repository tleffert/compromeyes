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
    const [sortBy, setSortBy] = useState('Name');
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
        const sortedData = [...data].sort((a, b) => {
            let aNorm = a[sortBy].toLowerCase();
            let bNorm = b[sortBy].toLowerCase();

            if ( aNorm < bNorm) {
                return sortDir === 'asc' ? -1 : 1;
            }

            if ( aNorm > bNorm) {
                return sortDir === 'asc' ? 1 : -1;
            }

            return 0;
        });

        setData(sortedData);
    }, [sortBy, sortDir]);

    const sortHandler = (prop, dir) => {
        if (prop === sortBy) {
            setSortDir(prevState => prevState === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(prop);
            setSortDir('asc');
        }
    }

    const headCells = [
        { id: 'Name', label: 'Site', sortable: true},
        { id: 'Title', label: 'Title', sortable: true},
        { id: 'PwnCount', label: 'Count'},
        { id: 'BreachDate', label: 'Breach Date'}
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
                                      onClick={() => cell.sortable ? sortHandler(cell.id) : null}
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
