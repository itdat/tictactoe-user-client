import React, { useState, useEffect, useContext } from "react";
import queryString from 'query-string';

import { Grid, Button } from "@material-ui/core";

import Game from "../components/Game";
import Chat from "../components/Chat/Chat/Chat";
import OnlineListWrapper from "../components/OnlineListWrapper";
import { ThemeContext } from '../App';

const Room = ({ location }) => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [level, setLevel] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [room, setRoom] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([
    {
      squares: Array(100).fill(null),
      winner: null,
      winMoves: [],
      move: null,
    },
  ]);
  const [controller, setController] = useState();
  const [roomInfo, setRoomInfo] = useState();

  const socket = useContext(ThemeContext)

  const handleTest = (e) => {
    e.preventDefault();

    const testData = {
      history,
      messages,
    }
    console.log(controller);
    // console.log(testData);
  }

  useEffect(() => {
    const { name, room, roomName, level } = queryString.parse(location.search);

    setName(name ?? '');
    setRoom(roomName);
    setLevel(level);
    setRoomCode(room)

    if (room) {
      socket.emit('joinRoom', { name: name, roomId: room, roomName: roomName, roomLevel: level }, (user, room) => {
        if (room) {
          console.log("..roomInfo =", room)
          // setController(room.host);
          setRoom(room.name);
          setLevel(room.level);
          setRoomInfo({ host: room.host, player2: room.player2 })
        }
      });
    }

    socket.on('message', message => {
      setMessages(msgs => [...msgs, message]);
    });

    socket.on("roomData", ({ user, room }) => {
      if (room) {
        console.log("..roomInfo =", room)
        setRoomInfo({ host: room.host, player2: room.player2 })
      }
    });
  }, [socket, location.search]);

  const onChangeHistory = (item) => {
    console.log("[Room] ..onChangeHistory", item);
    setHistory(item);

    if (roomInfo) {
      // console.log("..controller =", controller);
      // console.log("..host =", roomInfo.host);
      // console.log("..player2 =", roomInfo.player2);
      const newController = controller.name === roomInfo.host.name ? roomInfo.player2 : roomInfo.host;

      // console.log("..newController =", newController);

      // setController(newController);
    }

    if (item[item.length - 1].winner) {
      // TODO: submit api
      const testData = {
        history,
        messages,
        winner: controller,
      }
      console.log(testData);
    }
  };

  return (<OnlineListWrapper isToggled={false}>
    {room ? (<Grid container>
      <Grid item lg={8} xs={12}>
        <Game history={history} controller={controller} onChangeHistory={onChangeHistory} />
      </Grid>
      <Grid item lg={4} xs={12}>
        <h4>ROOM CODE:</h4>
        <h4>{roomCode}</h4>
        <Button variant="contained" color="secondary" onClick={handleTest}>TEST</Button>
        <Chat name={room} room={room} messages={messages} />
      </Grid>
    </Grid>) : <h5>There is no game for you. Please select a room!</h5>}
  </OnlineListWrapper>);
};

export default Room;
