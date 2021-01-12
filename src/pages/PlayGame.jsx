import React, { Fragment, useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import RoomSearchHeader from "../components/PlayGame/RoomSearchHeader";
import GameRoomListView from "../components/PlayGame/RoomListView";
import RoomCreateModal from "../components/PlayGame/RoomCreateModal"
import OnlineListWrapper from "../components/OnlineListWrapper";
import Popups from "../components/Display/Popups";
import { ThemeContext } from '../App';
import AuthContext from "../context/auth/authContext";

const useStyles = makeStyles(() => ({
  card: {
    minHeight: 500,
  },
}));

const PlayGame = () => {
  const { user } = useContext(AuthContext);
  const [name] = useState(user?.username ?? '');

  const classes = useStyles();
  const history = useHistory();

  const socket = useContext(ThemeContext);
  const [roomItems, setRoomItems] = useState([]);

  useEffect(() => {
    // Reload data 
    socket.emit('reloadRooms');

    socket.on('getRooms', ({ rooms }) => {
      setRoomItems(rooms);
    });
  }, []);

  const goToRoom = (name, room, roomName, level) => {
    history.push(`/room?name=${name}&room=${room}&roomName=${roomName}&level=${level}`);
  };

  return <Fragment>
    <OnlineListWrapper>
      <h1>Play Game</h1>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ marginTop: "25px" }}
      >
        <RoomSearchHeader />
        <Popup
          modal
          lockScroll={true}
          nested
          trigger={<Button variant="contained" color="primary"> Create room </Button>}>
          {close => name && name !== ''
            ? (<RoomCreateModal close={close} onClick={goToRoom} />)
            : (Popups.Information("Please login!", close = { close }))}
        </Popup>
      </Grid>
      {roomItems && roomItems.length !== 0
        ? (<Card className={classes.card} style={{ marginTop: "15px" }}>
          <CardContent style={{ padding: "18px" }}>
            <GameRoomListView rooms={roomItems} />
          </CardContent>
        </Card>)
        : <h5 style={{ marginTop: "50px" }}>There are no result.</h5>}
    </OnlineListWrapper>
  </Fragment>;
};

export default PlayGame;
