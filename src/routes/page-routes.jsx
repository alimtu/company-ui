import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainDashboard from "../pages/main-dashboard";
//---
import OfficialRoutes from "./official-routes";
import SettingsRoutes from "./settings-routes";
//---

const PageRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/official`}
        render={() => <OfficialRoutes path={path} />}
      />
      <ProtectedRoute
        path={`${path}/settings`}
        render={() => <SettingsRoutes path={path} />}
      />

      <ProtectedRoute path={`${path}/`} exact component={MainDashboard} />
    </Switch>
  );
};

export default PageRoutes;
