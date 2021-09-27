import { globalGetService } from "../../utils/globalApiServices";

export const fetchAnalyticsData = (query = {}) => {
  return (dispatch) => {
    globalGetService(
      `/report?startDate=2021-05-01&endDate=2021-05-03`,
      query
    ).then((response) => {
      dispatch(fetchAnalystics(response.data.data));
    });
  };
};

export const fetchAnalystics = (result) => {
  return {
    type: "SET_ANALYTICS",
    payload: result,
  };
};
