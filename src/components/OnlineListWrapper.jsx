import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';

import { Grid } from "@material-ui/core";

import OnlineList from "../components/OnlineList";
import { ThemeContext } from '../App';
import AuthContext from "../context/auth/authContext";

const OnlineListWrapper = ({ children}) => {
  const { user, isAuthenticated, error, clearErrors, loadUser } = useContext(AuthContext);
  const socket = useContext(ThemeContext)

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  // Listen if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && user.username !== "") {
      socket.emit("setOnlineStatus", { name: user.username }, (err) => {
        if (err) {
          alert(err);
        } else {
          // history.push("/play-game");
        }
      });
    }

    if (error === "Invalid Credentials") {
      // setAlert(error, "danger");
      alert(error);
      clearErrors();
    }
    
    // Reload data because Sidebar cause error if online list component is located in different pages
    socket.emit('reloadOnlineUsers');

    // eslint-disable-next-line
  }, [error, isAuthenticated, user]);

  return <Grid container style={{ margin: "-2rem" }}>
    <Grid item lg={10} xs={12}>
      <div style={{ margin: "2rem" }}>
        {children}
      </div>
    </Grid>
    <Grid item lg={2} xs={12}>
      <OnlineList />
    </Grid>
  </Grid>;
};

export default OnlineListWrapper;

OnlineListWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  // details: PropTypes.element,
}

// OnlineListWrapper.defaultProps = {
//   details: null,
// }
