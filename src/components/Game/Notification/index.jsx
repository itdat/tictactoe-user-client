import React from "react";

const Notification = ({ status, player }) => (
  <div className="d-flex align-items-center justify-content-center my-3">
    <h3 className="mb-0">
      <span className="align-middle">{status}</span>
      {player}
    </h3>
  </div>
);

export default Notification;
