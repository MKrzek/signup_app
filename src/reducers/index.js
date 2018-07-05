import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import fetchComments from "./fetchComments";
import saveComments from "./saveComment";
import authReducer from "./auth";
const rootReducer = combineReducers({
  auth: authReducer,
  saveComments: saveComments,
  fetchComments: fetchComments,
  router: routerReducer
});
export default rootReducer;
