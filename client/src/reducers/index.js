import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import fetchComments from "./fetchComments";
import saveComments from "./saveComment";
import authReducer from "./auth";
import { reducer as formReducer } from "redux-form";
const rootReducer = combineReducers({
  auth: authReducer,
  // saveComments: saveComments,
  // fetchComments: fetchComments,
  router: routerReducer,
  form: formReducer
});
export default rootReducer;
