import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAnalystics } from "./globalStore/actions/analytics";
import "./assets/styles/app.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnalystics([{ id: 1, name: "User" }]));
  }, [dispatch]);

  return <div>GGTable</div>;
}

export default App;
