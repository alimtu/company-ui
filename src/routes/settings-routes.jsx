import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import SettingsDashboard from "../components/app-modules/settings/settings-dashboard";
import BasicInfoDashboard from "../components/app-modules/settings/basic-info/basic-info-dashboard";
import ProvincesPage from "../components/app-modules/settings/basic-info/provinces-page";
import CitiesPage from "../components/app-modules/settings/basic-info/cities-page";
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
        exact
        component={BasicInfoDashboard}
      />
      <ProtectedRoute
        path={`${path}/settings/basic-info/provinces`}
        exact
        render={() => <ProvincesPage pageName="Provinces" />}
      />
      <ProtectedRoute
        path={`${path}/settings/basic-info/cities`}
        exact
        render={() => <CitiesPage pageName="Cities" />}
      />
    </Switch>
  );
};

export default SettingsRoute;
