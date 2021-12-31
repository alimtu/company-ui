import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TimexSettingsDashboard from "../../components/app-modules/settings/timex-settings/timex-settings-dashboard";
import SecurityGuardsPage from "../../components/app-modules/settings/timex-settings/security-guards-page";
import VacationTypesPage from "../../components/app-modules/settings/timex-settings/vacation-types-page";
import MissionTypesPage from "../../components/app-modules/settings/timex-settings/mission-types-page";
import HolidaysPage from "../../components/app-modules/settings/timex-settings/holidays-page";
//---

const modulePath = "settings/timex";

const SettingsBasicInfoRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TimexSettingsDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/security-guards`}
        exact
        render={() => <SecurityGuardsPage pageName="SecurityGuards" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/security-guards`}
        exact
        render={() => <SecurityGuardsPage pageName="SecurityGuards" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/vacation-types`}
        exact
        render={() => <VacationTypesPage pageName="VacationTypes" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/mission-types`}
        exact
        render={() => <MissionTypesPage pageName="MissionTypes" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/holidays`}
        exact
        render={() => <HolidaysPage pageName="Holidays" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default SettingsBasicInfoRoutes;
