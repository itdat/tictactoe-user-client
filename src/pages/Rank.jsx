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
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import UserSearchHeader from "../components/Rank/UserSearchHeader";
import SecondPrize from "../images/second-prize.png";
import FirstPrize from "../images/first-prize.svg";
import ThirdPrize from "../images/third-prize.svg";
import Box from "@material-ui/core/Box";


import axios from "axios";
import { useHistory } from "react-router-dom";

import OnlineListWrapper from "../components/OnlineListWrapper";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#004c9e",
    color: theme.palette.common.white,
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    fontSize: 20,
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({}))(TableRow);

const loadData = (rank, user, match, cup, win, draw, lose) => {
  return { rank, user, match, cup, win, draw, lose };
};
const rows = [
  loadData(1, "nvh", 500, 5, "250", "120", "130"),
  loadData(2, "nvh", 400, 4, "180", "100", "120"),
  loadData(3, "nvh", 300, 3, "90", "150", "60"),
  loadData(4, "nvh", 200, 2, "30", "145", "25"),
];

const Rank = () => {
  const classes = useStyles();
  //const [rows, setRows] = useState([]);
  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await axios(`http://localhost:4000/users/rank/`);
    console.log(res.data);
    //setRows([...res.data]);
  }, [rows.id]);
  return (
    <OnlineListWrapper>
      <h1>Rank</h1>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: "25px", marginBottom: "25px" }}
      >
        <Grid item xs={4}>
          <Paper variant="outlined" style={{padding:10,  borderColor: "gray"}}>
            <Typography >User: <span style={{fontSize:"150%", fontWeight:"bold"}}>Name</span></Typography>
            <Typography>Rank: 1</Typography>
            <Typography>Match: 500</Typography>
            <Typography>Cup: 5</Typography>
            <Typography>Win ratio: 50%</Typography>
            </Paper>
        </Grid>
        <Grid item xs={8} container justify="flex-end" alignItems="center">
        <UserSearchHeader />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Match</StyledTableCell>
              <StyledTableCell>Cup</StyledTableCell>
              <StyledTableCell>W/D/L</StyledTableCell>
              <StyledTableCell>Win Ratio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id} hover>
                <StyledTableCell style={{ padding: 10 }}>
                  {row.rank === 1 ? (
                    <Image src={FirstPrize} />
                  ) : row.rank === 2 ? (
                    <Image src={SecondPrize} />
                  ) : row.rank === 3 ? (
                    <Image src={ThirdPrize} />
                  ) : (
                    row.rank
                  )}
                </StyledTableCell>
                <StyledTableCell>{row.user}</StyledTableCell>
                <StyledTableCell>{row.match}</StyledTableCell>
                <StyledTableCell>{row.cup}</StyledTableCell>
                <StyledTableCell style={{ padding: 5 }}>
                  <Box display="flex">
                    <Box
                      style={{
                        backgroundColor: "#3d95e5",
                        width: (100 * row.win) / row.match + "%",
                      }}
                    >
                      <span style={{ fontSize: "70%" }}>{row.win}</span>
                    </Box>
                    <Box
                      style={{
                        backgroundColor: "#fd9630",
                        width: (100 * row.draw) / row.match + "%",
                      }}
                    >
                      <span style={{ fontSize: "70%" }}>{row.draw}</span>
                    </Box>
                    <Box
                      style={{
                        backgroundColor: "#ee5a52",
                        width: (100 * row.lose) / row.match + "%",
                      }}
                    >
                      <span style={{ fontSize: "70%" }}>{row.lose}</span>
                    </Box>
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  {(100 * row.win) / row.match}%
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OnlineListWrapper>
  );
};

export default Rank;
