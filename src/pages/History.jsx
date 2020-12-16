import OnlineListWrapper from "../components/OnlineListWrapper";

import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const History = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const username = "nvh";
  const [name] = useState(
    localStorage.getItem('currentName') || ''
  );
  const handleRowClick = (name,match)=>{
    history.push('/room');
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      
    const res = await axios(
        `http://localhost:5000/users/history/${username}`
      );
    setRows([...res.data]);
  },[rows.id]);


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
                <StyledTableCell component="th" scope="row" onClick = {handleRowClick}>
                  {row._id}
                </StyledTableCell>
                <StyledTableCell>{row.result===true?"Thắng":"Thua"}</StyledTableCell>
                <StyledTableCell>{row.competitor}</StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OnlineListWrapper>
  );
};

export default History;
