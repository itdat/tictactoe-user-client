import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { v4 as uuid } from "uuid";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Rating from '@material-ui/lab/Rating';
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // Room card
  cardItem: {
    border: "1px solid rgba(0,0,0,.05)",
    borderRadius: ".375rem",
    color: theme.palette.text.secondary,
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  // Image
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  // Avatar
  flexGrid: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.3),
    },
    alignItems: "center",
  },
}));

/* const rooms = [
  { name: 'ASFRNYU', level: 5, host: 'ken.yoho', status: 'waiting', participants: 1 },
  { name: 'ASFRNYU', level: 2, host: 'thucuyen01', status: 'playing', participants: 6 },
  { name: 'HJSBNSB', level: 3, host: 'vanhuy', status: 'waiting', participants: 1 },
  { name: 'H9HSJ45', level: 3, host: 'tuandat', status: 'playing', participants: 5 },
  { name: 'HHJSHS7', level: 1, host: 'datit', status: 'waiting', participants: 1 },
  { name: '48HHNVS', level: 4, host: 'huyit12', status: 'waiting', participants: 1 },
  { name: '52GSHSH', level: 2, host: 'huyphan', status: 'waiting', participants: 1 },
  { name: '98GSHGS', level: 2, host: 'nikochin', status: 'waiting', participants: 1 },
  { name: '8FGHS09', level: 1, host: 'tuyennguyen', status: 'waiting', participants: 1 },
]; */

export default function RoomListView({ rooms }) {
  const { user } = useContext(AuthContext);
  const [username] = useState(user?.username ?? '');

  const classes = useStyles();
  const history = useHistory();

  const goToRoom = (name, room, roomName, level) => {
    history.push(`/room?name=${name}&room=${room}&roomName=${roomName}&level=${level}`);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {rooms.filter((room) => room.status !== "quickly").map(({ id, level, name, host, player2, guests, status }) => (
          <Grid item xs={4} key={uuid()}>
            <Container spacing={3} className={classes.cardItem}>
              <Grid item>
                <ButtonBase
                  focusRipple
                  key={name}
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  style={{
                    width: "100%",
                  }}
                  onClick={() => {
                    goToRoom(username, id, name, level)
                  }}
                >
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: "url('https://imga.androidappsapk.co/-ysq_cTj3MZLWLl2dCLujV_QRk7AHow-BNFMjC9y652Z2hugmisPauuL86zTrJk3sUg=h300')"
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      className={classes.imageTitle}
                    >
                      Join room
                      <span className={classes.imageMarked} />
                    </Typography>
                  </span>
                </ButtonBase>
              </Grid>
              <Grid item style={{ marginTop: "15px" }}>
                <Typography align="center" gutterBottom variant="subtitle1">
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm container spacing={1} style={{ justifyContent: "center", alignItems: "center", marginTop: "8px" }}>
                <Grid item>
                  <Typography component="legend">Level</Typography>
                </Grid>
                <Grid item>
                  <Rating name="read-only" value={parseInt(level)} readOnly />
                </Grid>
              </Grid>
              <Grid item xs={12} sm container style={{ justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                {status === 'waiting'
                  ? (<Grid item>
                    <div className={classes.flexGrid}>
                      <Tooltip title={host?.name || ''}>
                        <Avatar alt="gamer 01" src="" ></Avatar>
                      </Tooltip>
                      <Typography variant="body2">
                        Player 01
                      </Typography>
                    </div>
                  </Grid>)
                  : (<Grid item>
                    <AvatarGroup max={4}>
                      {[host, player2, ...guests].map(({ name }, i) => (
                        <Tooltip title={name}>
                          <Avatar key={i} alt="avatar" src=""></Avatar>
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Grid>)}
                <Grid item>
                  {status === 'waiting'
                    ? (<Typography style={{ color: "#ffb400" }} variant="subtitle2" gutterBottom>{status}</Typography>)
                    : (<Typography style={{ color: "limegreen" }} variant="subtitle2" gutterBottom>{status}</Typography>)
                  }
                </Grid>
              </Grid>
            </Container>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
