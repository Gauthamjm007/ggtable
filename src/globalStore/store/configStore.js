import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import analyticsReducer from "../reducers/analytics";
import appsReducer from "../reducers/app";

const configStore = () => {
  const rootReducer = combineReducers({
    analytics: analyticsReducer,
    apps: appsReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};
export default configStore;
