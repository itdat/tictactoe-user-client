import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";

import OnlineList from "../components/OnlineList";
import { ThemeContext } from "../App";
import { Grid } from "@material-ui/core";

const Logout = () => {
  const { user, logout } = useContext(AuthContext);
  const socket = useContext(ThemeContext);

  useEffect(() => {
    if (user && socket) {
      socket.emit("removeOnlineStatus", { name: user.username });
    }

    logout();

    // Reload data because Sidebar cause error if online list component is located in different pages
    socket.emit('reloadOnlineUsers');
    
    // eslint-disable-next-line
  }, [socket]);

  return <Grid container style={{ margin: "-2rem" }}>
    <Grid item lg={10} xs={12}>
      <div style={{ margin: "2rem" }}>
        {user ? (<h1>Logout</h1>) : (<h6>You have been logged out..</h6>)}
      </div>
    </Grid>
    <Grid item lg={2} xs={12}>
      <OnlineList />
    </Grid>
  </Grid>;
};

export default Logout;
