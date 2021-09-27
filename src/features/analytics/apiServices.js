import { globalGetService } from "../utils/globalApiServices";

export const getAppReport = (query = {}) => {};

export const getAllApps = () => {
  globalGetService(`/apps`).then((response) => {
    if (response.statusCode === 200) {
    }
  });
};
