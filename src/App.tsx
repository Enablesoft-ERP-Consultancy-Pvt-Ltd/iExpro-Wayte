import "./app.css";
import { Router, Route } from "@solidjs/router";
import FourZeroFourPage from "./pages/404";
import HomeLoginPage from "./pages";
import ProtectedRoutesLayout from "./components/layouts/protected-routes-layout";
import WeightServicePage from "./pages/protected/weight-service";

function App() {
  return (
    <Router>
      <Route path={"/"} component={HomeLoginPage} />
      <Route path={"/protected"} component={ProtectedRoutesLayout}>
        <Route path={"/weight-service"} component={WeightServicePage} />
      </Route>
      <Route path={"*404"} component={FourZeroFourPage} />
    </Router>
  );
}

export default App;
