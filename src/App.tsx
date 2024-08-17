import "./app.css";
import { Router, Route } from "@solidjs/router";
import FourZeroFourPage from "~/pages/404";
import HomeLoginPage from "~/pages/index";
import ProtectedRoutesLayout from "~/components/layouts/protected-routes-layout";
import WeightServicePage from "~/pages/protected/weight-service";
import SettingsPage from "~/pages/protected/settings";
import ThemeProvider from "./components/state/providers/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Route path={"/"} component={HomeLoginPage} />
        <Route path={"/protected"} component={ProtectedRoutesLayout}>
          <Route path={"/weight-service"} component={WeightServicePage} />
          <Route path={"/settings"} component={SettingsPage} />
        </Route>
        <Route path={"*404"} component={FourZeroFourPage} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
