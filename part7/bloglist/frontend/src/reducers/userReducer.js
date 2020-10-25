export const initializeUsers = (users) => ({ type: "INIT_USERS", data: users });

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
