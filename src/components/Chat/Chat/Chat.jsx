import React, { useState, useEffect, useContext } from "react";

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
// import TextContainer from '../TextContainer/TextContainer'
import { ThemeContext } from '../../../App';

import './Chat.css';

const Chat = ({ name, room }) => {
  // const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socket = useContext(ThemeContext)

  useEffect(() => {
    socket.on('message', message => {
      setMessages(msgs => [...msgs, message]);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      {/* <TextContainer users={users} /> */}
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name || socket.id} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;