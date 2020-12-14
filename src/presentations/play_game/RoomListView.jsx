import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Rating from '@material-ui/lab/Rating';

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

const rooms = [
  { code: 'ASFRNYU', level: 5, host: 'ken.yoho', status: 'waiting', participants: 1 },
  { code: 'ASFRNYU', level: 2, host: 'thucuyen01', status: 'playing', participants: 6 },
  { code: 'HJSBNSB', level: 3, host: 'vanhuy', status: 'waiting', participants: 1 },
  { code: 'H9HSJ45', level: 3, host: 'tuandat', status: 'playing', participants: 5 },
  { code: 'HHJSHS7', level: 1, host: 'datit', status: 'waiting', participants: 1 },
  { code: '48HHNVS', level: 4, host: 'huyit12', status: 'waiting', participants: 1 },
  { code: '52GSHSH', level: 2, host: 'huyphan', status: 'waiting', participants: 1 },
  { code: '98GSHGS', level: 2, host: 'nikochin', status: 'waiting', participants: 1 },
  { code: '8FGHS09', level: 1, host: 'tuyennguyen', status: 'waiting', participants: 1 },
];

export default function GameRoomListView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {rooms.map(({ code, level, host, status, participants }) => (
          <Grid item xs={4}>
            <Container className={classes.cardItem}>
              <Grid item>
                <ButtonBase
                  focusRipple
                  key={code}
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  style={{
                    width: "100%",
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
              <Grid style={{ marginTop: "10px" }} item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {code}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Level</Typography>
                    <Rating name="read-only" value={level} readOnly />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container style={{ justifyContent: "space-between", alignItems: "center" }}>
                {status === 'waiting'
                  ? (<Grid item>
                    <div className={classes.flexGrid}>
                      <Avatar alt={host} src="" ></Avatar>
                      <Typography variant="body2">
                        {host}
                      </Typography>
                    </div>
                  </Grid>)
                  : (<Grid item>
                    <AvatarGroup max={4}>
                      {[...Array(participants)].map((e, i) => (
                        <Avatar key={i} alt="" src="" />
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
