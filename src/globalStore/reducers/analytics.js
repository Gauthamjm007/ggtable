const initialStateValue = [];

const analyticsReducer = (state = initialStateValue, action) => {
  switch (action.type) {
    case "SET_ANALYTICS":
      return [...action.payload];
    case "ADD_ANALYTICS":
      return [...state, { ...action.payload }];
    case "RESET_ANALYTICS":
      return [];
    default:
      return [...state];
  }
};

export default analyticsReducer;
