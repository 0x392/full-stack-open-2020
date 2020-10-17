export const setNotification = (content, sec) => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_NOTIFICATION_TIMER" });

    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 1000 * sec);

    dispatch({
      type: "SET_NOTIFICATION",
      data: { content, timer },
    });
  };
};

const initialState = { content: null, timer: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        content: action.data.content,
        timer: action.data.timer,
      };
    case "CLEAR_NOTIFICATION":
      return initialState;
    case "CLEAR_NOTIFICATION_TIMER":
      clearInterval(state.timer);
      return { ...state, timer: null };
    default:
      return state;
  }
};

export default reducer;
