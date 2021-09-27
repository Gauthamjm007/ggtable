import { format } from "date-fns";
import { roundToTwo } from "../../utils";
import { globalGetService } from "../../utils/globalApiServices";

export const fetchAnalyticsData = (query = {}) => {
  return (dispatch) => {
    globalGetService(
      `/report?startDate=2021-05-01&endDate=2021-05-03`,
      query
    ).then((response) => {
      const _analyticsData = response?.data?.data.map((item) => {
        return {
          ...item,
          // date: format(new Date(item.date), "d MMM y"),
          date: item.date,
          revenue: roundToTwo(item.revenue),
          fill_rate: roundToTwo((item.requests / item.responses) * 100),
          ctr: roundToTwo((item.clicks / item.impressions) * 100),
        };
      });
      dispatch(fetchAnalystics(_analyticsData));
    });
  };
};

export const fetchAnalystics = (result) => {
  return {
    type: "SET_ANALYTICS",
    payload: result,
  };
};
