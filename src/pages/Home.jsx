import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import Maintenance from "../components/Maintenance";
import { ThemeContext } from "../App";
import OnlineListWrapper from "../components/OnlineListWrapper";

const Home = ({ history }) => {
  const socket = useContext(ThemeContext);

  // Use auth context
  const authContext = useContext(AuthContext);
  const { error, clearErrors, isAuthenticated, loadUser, user } = authContext;

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
          history.push("/");
        }
      });
    }

    if (error === "Invalid Credentials") {
      // setAlert(error, "danger");
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  return (
    <OnlineListWrapper>
      <Maintenance />
    </OnlineListWrapper>
  );
};

export default Home;
