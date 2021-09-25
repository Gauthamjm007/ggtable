const initialStateValue = [];

const analyticsReducer = (state = initialStateValue, action) => {
  //console.log(action.payload);
  switch (action.type) {
    case "INITIAL_ANALYTICS":
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
