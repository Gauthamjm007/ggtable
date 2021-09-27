import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchAnalyticsData, fetchAppDataApi } from "./globalStore/actions";
import "./assets/styles/app.scss";
import { analyticsRoutes } from "../src/features/analytics/analyticsRoutes";
import { format, startOfMonth, endOfMonth } from "date-fns";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppDataApi());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Switch>
          {analyticsRoutes.map(({ path, component, key }) => (
            <Route exact path={path} component={component} key={key} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
