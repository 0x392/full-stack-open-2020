import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import sessionReducer from "./reducers/sessionReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  session: sessionReducer,
  users: userReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
