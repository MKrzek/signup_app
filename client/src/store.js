import React from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import async from "./middlewares/async";
import stateValidator from "./middlewares/stateValidator";

import rootReducer from "./reducers/index";

export default ({ children, initialState = {} }) => {
  const store = createStore(
    rootReducer,

    initialState,
    applyMiddleware(async, stateValidator)
  );
  return <Provider store={store}>{children}</Provider>;
};
