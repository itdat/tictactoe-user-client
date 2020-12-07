import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaintenanceImage from "../images/Maintenance.svg";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    display: "block",
    width: "60%",
  },
}));

const Maintenance = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.container}>
        <img className={classes.content} src={MaintenanceImage} alt="logo" />
      </div>
      <Typography variant="h1" align="center">
        The feature is under maintenance
      </Typography>
    </Fragment>
  );
};

export default Maintenance;
