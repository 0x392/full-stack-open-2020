export const initializeUserList = (list) => ({
  type: "INIT_USER_LIST",
  data: list,
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USER_LIST":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
