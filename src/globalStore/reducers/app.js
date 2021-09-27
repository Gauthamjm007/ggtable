const initialStateValue = [];

const appsReducer = (state = initialStateValue, action) => {
  switch (action.type) {
    case "SET_APPS":
      return [...action.payload];
    case "ADD_APPS":
      return [...state, { ...action.payload }];
    case "RESET_APPS":
      return [];
    default:
      return [...state];
  }
};

export default appsReducer;
