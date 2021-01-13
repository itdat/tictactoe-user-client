import React from "react";
import Maintenance from "../components/Maintenance";
import OnlineListWrapper from "../components/OnlineListWrapper";

const Home = ({ history }) => {

  return (
    <OnlineListWrapper>
      <Maintenance />
    </OnlineListWrapper>
  );
};

export default Home;
