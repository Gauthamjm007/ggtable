import { globalGetService } from "../../utils/globalApiServices";
import { getCachedData, setUrlToCache } from "../../utils";

export const fetchAppDataApi = (query = {}) => {
  return (dispatch) => {
    let url = "/apps";
    if (
      getCachedData(url).data &&
      Object.keys(getCachedData(url).data)?.length
    ) {
      const data = getCachedData(url).data[url].data;
      dispatch(fetchAppData(data));
    } else {
      globalGetService(`/apps`, query).then((response) => {
        dispatch(fetchAppData(response.data.data));
        setUrlToCache(url, response.data.data, response.cache_time);
      });
    }
  };
};

export const fetchAppData = (result) => {
  return {
    type: "SET_APPS",
    payload: result,
  };
};
