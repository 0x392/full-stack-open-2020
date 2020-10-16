export const showNotification = (notification) => ({
  type: "SET_NOTIFICATION",
  data: { notification },
});

export const hideNotification = () => ({
  type: "SET_NOTIFICATION",
  data: { notification: null },
});

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    default:
      return state;
  }
};

export default reducer;
