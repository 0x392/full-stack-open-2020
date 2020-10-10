import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const color = message.type === "successful" ? "green" : "red";
  const style = {
    border: `1px solid ${color}`,
    borderRadius: ".5rem",
    color: color,
    marginBottom: ".5rem",
    padding: ".5rem",
  };

  return <div style={style}>{message.content}</div>;
};

Notification.propTypes = { message: PropTypes.object };

export default Notification;
