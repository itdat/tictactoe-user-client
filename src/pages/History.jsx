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
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import RoomSearchHeader from "../components/PlayGame/RoomSearchHeader";
import Typography from "@material-ui/core/Typography";
import Trophy from "../images/trophy.svg";
import Defeat from "../images/loser.jpg";

import axios from "axios";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#004c9e",
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
const loadData = (id, result, room, level, competitor, date) => {
  return { id, result, room, level, competitor, date };
};
// const rows = [
//   loadData(1, true, "solo", 5, "nvh", "22/12/2020"),
//   loadData(2, false, "play", 4, "ntd", "30/12/2020"),
//   loadData(3, false, "hard", 3, "ntd", "30/12/2020"),
//   loadData(4, true, "fun", 2, "ntd", "30/12/2020"),
// ];
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
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ marginTop: "25px", marginBottom: "25px" }}
      >
        <RoomSearchHeader />
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Result</StyledTableCell>
              <StyledTableCell>Room</StyledTableCell>
              <StyledTableCell>Level</StyledTableCell>
              <StyledTableCell>Competitor</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id} hover onClick={handleRowClick}>
                <StyledTableCell style={{ padding: 5 }}>
                  {row.result === true ? (
                    <Image src={Trophy} />
                  ) : (
                    <Image src={Defeat} />
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {row.result === true ? (
                    <Typography
                      style={{ color: "#64b5f6", fontWeight: "bold" }}
                    >
                      Victory
                    </Typography>
                  ) : (
                    <Typography
                      style={{ color: "#f44336", fontWeight: "bold" }}
                    >
                      Defeat
                    </Typography>
                  )}
                </StyledTableCell>
                <StyledTableCell>{row.room}</StyledTableCell>
                <StyledTableCell>
                  {row.level === 1 ? (
                    <Rating name="level" value={1} readOnly size="small" />
                  ) : row.level === 2 ? (
                    <Rating name="level" value={2} readOnly size="small" />
                  ) : row.level === 3 ? (
                    <Rating name="level" value={3} readOnly size="small" />
                  ) : row.level === 4 ? (
                    <Rating name="level" value={4} readOnly size="small" />
                  ) : (
                    <Rating name="level" value={5} readOnly size="small" />
                  )}
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
