import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import BasicInfoDashboard from "../../components/app-modules/settings/basic-info/basic-info-dashboard";
import ProvincesPage from "../../components/app-modules/settings/basic-info/provinces-page";
import CitiesPage from "../../components/app-modules/settings/basic-info/cities-page";
//---

const modulePath = "settings/basic-info";

const SettingsBasicInfoRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={BasicInfoDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/provinces`}
        exact
        render={() => <ProvincesPage pageName="Provinces" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/cities`}
        exact
        render={() => <CitiesPage pageName="Cities" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default SettingsBasicInfoRoutes;
