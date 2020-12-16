import React, { useState } from "react";

import OnlineListWrapper from "../components/OnlineListWrapper";

const Logout = () => {
  const [name] = useState(
    localStorage.getItem('currentName') || ''
  );

  // Clear cache 
  localStorage.setItem('currentName', '');

  return <OnlineListWrapper>
    {name && name !== '' ? (<h1>Logout</h1>) : (<h6>You have been logged out from system.</h6>)}
  </OnlineListWrapper>;
};

export default Logout;
