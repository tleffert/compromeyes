import { Fragment, useState, useEffect } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TableSortLabel, Box
} from '@material-ui/core';

import ResultFilter from './result-filter';
import CollapseRow from './CollapseRow';

import styles from './BreachResults.module.css';

// Meaty monster, handles table and sorting - probably what is causing performance issues
const BreachResults = (props) => {

    const [data, setData] = useState(props.data);
    const [sortBy, setSortBy] = useState('Name');
    const [sortDir, setSortDir] = useState('asc');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Debouncing this would help greatly, not needing to change the data on every key stroke
        setData(props.data.filter(item => {
            const itemName = item.Name.toLowerCase();
            return itemName.includes(searchText.toLowerCase());
        }));
    }, [searchText, props.data]);


    useEffect(() => {
        let dataCopy = [...props.data];
        const sortedData = dataCopy.sort((a, b) => {
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
    }, [sortBy, sortDir, props.data]);

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

    /* Could/Probably should split this into smaller parts. Would (I think) help track down
        the performance. I'm guessing is related to changedetection and cuasing way more than needed
        digest/render cycles.
    */
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
