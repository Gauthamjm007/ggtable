import AnalyticsContainer from "./containers/AnalyticsContainer";
import pageLayoutHoc from "../../hocs/pageLayoutHoc";
export const analyticsRoutes = [
  {
    path: "/analytics",
    component: pageLayoutHoc(AnalyticsContainer, {}),
    key: "analytics",
  },
];
