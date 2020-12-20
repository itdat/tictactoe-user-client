import React, { useState, useContext } from "react";
import AuthContext from "../context/auth/authContext";

import OnlineListWrapper from "../components/OnlineListWrapper";

const Logout = () => {  
  const { user } = useContext(AuthContext);


  return <OnlineListWrapper>
    {user ? (<h1>Logout</h1>) : (<h6>You have been logged out from system.</h6>)}
  </OnlineListWrapper>;
};

export default Logout;
