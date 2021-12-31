import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
import SettingsDashboard from "../../components/app-modules/settings/settings-dashboard";
//---
import SettingsBasicInfoRoutes from "./settings-basic-info-routes";
import SettingsTimexRoutes from "./settings-timex-routes";
import SettingsAccessesRoutes from "./settings-accesses-routes";
//---

const SettingsRoute = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/settings`}
        exact
        component={SettingsDashboard}
      />
      <ProtectedRoute
        path={`${path}/settings/basic-info`}
        render={() => <SettingsBasicInfoRoutes path={path} />}
      />
      <ProtectedRoute
        path={`${path}/settings/timex`}
        render={() => <SettingsTimexRoutes path={path} />}
      />
      <ProtectedRoute
        path={`${path}/settings/accesses`}
        render={() => <SettingsAccessesRoutes path={path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default SettingsRoute;
