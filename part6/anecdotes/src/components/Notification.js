import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.content);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return notification !== null ? <div style={style}>{notification}</div> : null;
};

export default Notification;
