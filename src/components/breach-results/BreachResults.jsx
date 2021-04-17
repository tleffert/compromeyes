import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';


const BreachResults = (props) => {

    return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Site</TableCell>
                <TableCell>Breach Date</TableCell>
                <TableCell>Targets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((row) => (
                <TableRow key={row.Name}>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell>{row.BreachDate}</TableCell>
                   <TableCell>
                       {row.DataClasses.map(breachClass => {
                           return (
                               <Chip
                                   size="small"
                                   key={`${row.Name}-${breachClass}`}
                                   label={breachClass}
                               />
                           );
                       })

                       }
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}

export default BreachResults;
