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
  const username = "nvh";

  const handleRowClick = (match)=>{
    
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      
    const res = await axios(
        `http://localhost:5000/users/history/${username}`
      );
    console.log(res);
    console.log(...rows,res.data);
    setRows(...rows,res.data);
    console.log(rows);
  },[]);


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
            {rows.length?rows.map((row) => (
              <StyledTableRow key={row.id} hover="true" >
                <StyledTableCell component="th" scope="row" onClick = {handleRowClick}>
                  {row.id!==null?row.id:""}
                </StyledTableCell>
                <StyledTableCell>{row.result===true?"Thắng":"Thua"}</StyledTableCell>
                <StyledTableCell>{row.competitor}</StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
              </StyledTableRow>
            )):(
            <StyledTableRow >
              <StyledTableCell >
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </OnlineListWrapper>
  );
};

export default History;
