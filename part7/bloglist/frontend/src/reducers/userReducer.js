const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data.user;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default reducer;
