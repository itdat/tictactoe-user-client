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
import Image from "material-ui-image";

import axios from "axios";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
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
  //const username = "nvh";
  const [name] = useState(localStorage.getItem("currentName") || "");

  const handleRowClick = (e) => {
    history.push("/room");
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await axios(`http://localhost:4000/users/history/${name}`);
    console.log(res.data);
    setRows([...res.data]);
  }, [rows.id]);

  return (
    <OnlineListWrapper>
      <h1>History</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Result</StyledTableCell>
              <StyledTableCell>Competitor</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.id}
                hover="true"
                onClick={handleRowClick}
                style={{
                  background:
                    row.result === false
                      ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
                      : "linear-gradient(to left, #14eec8, #00e2db, #00d4e8, #00c5ed, #12b5eb)",
                }}
              >
                <StyledTableCell style={{ padding: 0 }}>
                  {row.result === true ? (
                    <Image src="https://img.icons8.com/emoji/48/000000/trophy-emoji.png" />
                  ) : (
                    ""
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {row.result === true ? "Thắng" : "Thua"}
                </StyledTableCell>
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
