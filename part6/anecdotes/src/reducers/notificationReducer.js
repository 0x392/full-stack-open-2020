export const showNotification = (notification) => ({
  type: "SET_NOTIFICATION",
  notification,
});

export const hideNotification = () => ({
  type: "SET_NOTIFICATION",
  notification: null,
});

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export default reducer;
