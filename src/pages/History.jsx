import OnlineListWrapper from "../components/OnlineListWrapper";

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
 
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  
}))(TableRow);

function createData(id, result, competitor, date, match) {

  return { id, result, competitor, date, match };
}

const rows = [
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
  createData('01', "Thắng", "nvh", "24/12/2020 20:00"),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function handleCellClick(){
    console.log("cell clicked")
}

const History = ()=>{
  const classes = useStyles();

  return (
    <OnlineListWrapper>
        <h1>History</h1>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Result</StyledTableCell>
            <StyledTableCell>Competitor</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id} hover="true" >
              <StyledTableCell component="th" scope="row" >
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.result}</StyledTableCell>
              <StyledTableCell>{row.competitor}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </OnlineListWrapper>
  );
}


export default History;