import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return null;

  const { type, content } = notification;
  return <div className={`notification notification-${type}`}>{content}</div>;
};

export default Notification;
