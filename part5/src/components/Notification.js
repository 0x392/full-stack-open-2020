import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const className =
    notification.type === "successful"
      ? "notification notification-success"
      : "notification notification-unsuccess";

  return <div className={className}>{notification.content}</div>;
};

Notification.propTypes = { notification: PropTypes.object };

export default Notification;
