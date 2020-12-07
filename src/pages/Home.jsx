import React, { Fragment } from "react";

import ResponsiveDrawer from "../layout/ResponsiveDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import OnlineList from "../components/OnlineList";
import Maintenance from "../components/Maintenance";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "2rem",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <ResponsiveDrawer>
        <Grid container>
          <Grid item lg={10} xs={12} className={classes.content}>
            <Maintenance />
          </Grid>
          <Grid item lg={2} xs={12}>
            <OnlineList />
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </Fragment>
  );
};

export default Home;
