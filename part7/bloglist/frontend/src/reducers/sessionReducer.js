export const setLoggedInUser = (user) => ({
  type: "SET_LOGGED_IN_USER",
  data: user,
});

const reducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN_USER":
      return { user: action.data };
    default:
      return state;
  }
};

export default reducer;
