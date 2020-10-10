import React from "react";

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

export default Notification;
