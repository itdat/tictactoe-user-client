import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import GameRoomSearchDropdown from "../presentations/play_game/RoomSearchDropdown";
import GameRoomListView from "../presentations/play_game/RoomListView";
import RoomCreateModal from "../presentations/play_game/RoomCreateModal"

const useStyles = makeStyles(() => ({
  card: {
    minHeight: 500,
  },
}));

const PlayGame = () => {
  const classes = useStyles();

  const onCreateRoom = () => {
    console.log('..click!');
  };

  return <Fragment>
    <h1>Play Game</h1>
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ marginTop: "25px" }}
    >
      <GameRoomSearchDropdown />
      <Popup
        modal
        lockScroll={true}
        trigger={<Button variant="contained" color="primary" onClick={onCreateRoom}> Create room </Button>}>
        {close => <RoomCreateModal close={close}/>}
      </Popup>
    </Grid>
    <Card className={classes.card} style={{ marginTop: "15px" }}>
      <CardContent style={{ padding: "18px" }}>
        <GameRoomListView />
      </CardContent>
    </Card>
  </Fragment>
};

export default PlayGame;
