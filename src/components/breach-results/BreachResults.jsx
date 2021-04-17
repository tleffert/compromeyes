import { Fragment, useState, useEffect } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Chip, makeStyles, TextField, TableSortLabel
} from '@material-ui/core';

import Spinner from '../UI/Spinner/Spinner';

const BreachResults = (props) => {

    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(props.data);
    const [sortBy, setSortBy] = useState();
    const [sortDir, setSortDir] = useState('asc');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setData(props.data.filter(item => {
            const itemName = item.Name.toLowerCase();
            return itemName.includes(searchText.toLowerCase());
        }));
    }, [searchText]);

    useEffect(() => {
        console.log("SORT BY UPDATED", sortBy);
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
        console.log("here is sort handler", sortProp, sortBy);
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
        { id: 'Domain', label: 'Domain'},
        { id: 'PwnCount', label: 'Count', type: "number"},
        { id: 'BreachDate', label: 'Breach Date', type: "date"}
    ];

    return (
        <Fragment>
            <TextField id="standard-basic" label="Search"
                onChange={(event) => setSearchText(event.target.value)}
                value={searchText}
            />
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
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
                    <TableRow key={row.Name}>
                      <TableCell component="th" scope="row">
                        {row.Title}
                      </TableCell>
                       <TableCell>{row.Domain}</TableCell>
                        <TableCell>{row.PwnCount}</TableCell>
                      <TableCell>{row.BreachDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Fragment>
    );
}

// <TableCell>
//     {row.DataClasses.map(breachClass => {
//         return (
//             <Chip
//                 size="small"
//                 key={`${row.Name}-${breachClass}`}
//                 label={breachClass}
//             />
//         );
//     })
//
//     }
// </TableCell>

export default BreachResults;
