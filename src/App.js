import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchAnalystics } from "./globalStore/actions/analytics";
import "./assets/styles/app.scss";
import { analyticsRoutes } from "../src/features/analytics/analyticsRoutes";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnalystics([{ id: 1, name: "User" }]));
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
