import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainDashboard from "../pages/main-dashboard";
//---
import SettingsRoutes from "./settings/settings-routes";
//---

const PageRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute path={`${path}/`} exact component={MainDashboard} />
      <ProtectedRoute
        path={`${path}/settings`}
        render={() => <SettingsRoutes path={path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default PageRoutes;
