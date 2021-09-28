import { format } from "date-fns";
import { roundToTwo } from "../../utils";
import { globalGetService } from "../../utils/globalApiServices";
import queryString from "query-string";
import { getCachedData, setUrlToCache } from "../../utils";

export const fetchAnalyticsData = (query = {}) => {
  return (dispatch) => {
    let url = "/report" + queryString.stringify(query);
    if (
      getCachedData(url).data &&
      Object.keys(getCachedData(url).data)?.length
    ) {
      const data = getCachedData(url).data[url].data;
      dispatch(fetchAnalystics(data));
    } else {
      globalGetService(`/report`, query).then((response) => {
        const _analyticsData = response?.data?.data.map((item) => {
          return {
            ...item,
            date: item.date,
            revenue: roundToTwo(item.revenue),
            fill_rate: roundToTwo((item.requests / item.responses) * 100),
            ctr: roundToTwo((item.clicks / item.impressions) * 100),
          };
        });

        setUrlToCache(url, _analyticsData, response.cache_time);
        dispatch(fetchAnalystics(_analyticsData));
      });
    }
  };
};

export const fetchAnalystics = (result) => {
  return {
    type: "SET_ANALYTICS",
    payload: result,
  };
};
