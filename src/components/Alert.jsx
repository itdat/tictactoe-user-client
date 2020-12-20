import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import AlertContext from "../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return alerts.map((alert) => (
    <Snackbar key={alert.id} open={true} message={alert.msg} />
  ));
};

export default Alerts;
