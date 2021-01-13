import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";

import OnlineListWrapper from "../components/OnlineListWrapper";
import { ThemeContext } from "../App";

const Logout = () => {  
  const { user, logout } = useContext(AuthContext);
  const socket = useContext(ThemeContext);

  useEffect(() => {
    if (user && socket) {
      socket.emit("removeOnlineStatus", { name: user.username });
    }
    
    logout();
    // eslint-disable-next-line
  }, [socket]);

  return <OnlineListWrapper>
    {user ? (<h1>Logout</h1>) : (<h6>You have been logged out..</h6>)}
  </OnlineListWrapper>;
};

export default Logout;
