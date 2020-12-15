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

  const socket = useContext(ThemeContext)

  useEffect(() => {
    const { name, room, level } = queryString.parse(location.search);

    setRoom(room);
    setName(name);
    setLevel(level);

    socket.emit('joinRoom', { name, room, roomLevel: level }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [socket, location.search]);

  return <Grid container>
    <Grid item lg={8} xs={12}>
      <Game />
    </Grid>
    <Grid item lg={4} xs={12}>
      <Chat name={name} room={room} />
    </Grid>
  </Grid>;
};

export default Room;
