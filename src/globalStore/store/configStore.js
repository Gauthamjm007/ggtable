import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import analyticsReducer from "../reducers/analytics";

const configStore = () => {
  const rootReducer = combineReducers({
    analytics: analyticsReducer,
  });
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
export default configStore;
