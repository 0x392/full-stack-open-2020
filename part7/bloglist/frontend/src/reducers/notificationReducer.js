export const setNotification = (type, content) => ({
  type: "SET_NOTIFICATION",
  data: { type, content },
});

export const clearNotification = () => ({ type: "CLEAR_NOTIFICATION" });

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default reducer;
