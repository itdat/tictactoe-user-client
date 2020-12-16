import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Typography,
} from "@material-ui/core";

import "./css/styles.css";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: '.75rem',
  }
}));

const Information = (content, { close, btnYes = "OK" }) => {

  return <div className="tictactoe-modal">
    <a href="#/" className="close" onClick={close}>
      &times;
    </a>
    <div className="header">
      <Typography><br /></Typography>
    </div>
    <div className="content">
      <Typography align='center' variant='body1'>{content}</Typography>
    </div>
    <div className="footer">
      <Button variant="contained" color="primary" onClick={() => {
        close();
      }}>
        {btnYes}
      </Button>
    </div>
  </div>;
}

const Confirm = (content, { close, onClick, btnYes = "OK", btnNo = "Cancel" }) => {
  const classes = useStyles();

  return <div className="tictactoe-modal">
    <a href="#/" className="close" onClick={close}>
      &times;
    </a>
    <div className="header">
      <Typography><br /></Typography>
    </div>
    <div className="content">
      <Typography align='center' variant='body1'>{content}</Typography>
    </div>
    <div className="footer">
      <Button className={classes.button} variant="contained" color="primary" onClick={() => {
        if (onClick) {
          onClick();
        }
        close();
      }}>
        {btnYes}
      </Button>
      <Button className={classes.button} variant="contained" color="default" onClick={() => {
        close();
      }}>
        {btnNo}
      </Button>
    </div>
  </div>;
}

const result = { Information, Confirm };

export default result;