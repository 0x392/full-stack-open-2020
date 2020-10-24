import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) {
    return null;
  }

  const className =
    notification.type === "successful"
      ? "notification notification-success"
      : "notification notification-unsuccess";

  return <div className={className}>{notification.content}</div>;
};

export default Notification;
