import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userListReducer from "./reducers/userListReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  userList: userListReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
