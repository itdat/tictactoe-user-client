import React, { useState, useEffect, useContext } from "react";
import queryString from 'query-string';

import { Grid } from "@material-ui/core";

import Game from "../components/Game";
import Chat from "../components/Chat/Chat/Chat";
import { ThemeContext } from '../App';

const Room = ({ location }) => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [level, setLevel] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [room, setRoom] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const socket = useContext(ThemeContext)

  useEffect(() => {
    const { name, room, roomName, level } = queryString.parse(location.search);

    setName(name ?? '');
    setRoom(roomName);
    setLevel(level);
    setRoomCode(room)

    if (room) {
      socket.emit('joinRoom', { roomId: room, roomName: roomName, roomLevel: level }, (user, room) => {
        if (room) {
          setRoom(room.name);
          setLevel(room.level);
        }
      });
    }
  }, [socket, location.search]);

  return room ? (<Grid container>
    <Grid item lg={8} xs={12}>
      <Game />
    </Grid>
    <Grid item lg={4} xs={12}>
      <h4>ROOM CODE:</h4>
      <h4>{roomCode}</h4>
      <Chat name={room} room={room} />
    </Grid>
  </Grid>) : <h5>There is no game for you. Please select a room!</h5>;
};

export default Room;
