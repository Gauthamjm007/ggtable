import { globalGetService } from "../../utils/globalApiServices";

export const fetchAppDataApi = (query = {}) => {
  return (dispatch) => {
    globalGetService(`/apps`, query).then((response) => {
      dispatch(fetchAppData(response.data.data));
    });
  };
};

export const fetchAppData = (result) => {
  return {
    type: "SET_APPS",
    payload: result,
  };
};
