export const setNotification = (text, sec) => {
  return (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", data: { notification: text } });
    setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATION", data: { notification: null } });
    }, 1000 * sec);
  };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;
    default:
      return state;
  }
};

export default reducer;
