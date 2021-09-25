export const fetchAnalystics = (result) => {
  return {
    type: "INITIAL_ANALYTICS",
    payload: result,
  };
};
