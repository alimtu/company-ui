import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import TimexDashboard from "../../components/app-modules/settings/timex/timex-dashboard";
import SecurityGuardsPage from "../../components/app-modules/settings/timex/security-guards-page";
import VacationTypesPage from "../../components/app-modules/settings/timex/vacation-types-page";
import MissionTypesPage from "../../components/app-modules/settings/timex/mission-types-page";
import HolidaysPage from "../../components/app-modules/settings/timex/holidays-page";
//---

const modulePath = "settings/timex";

const BasicInfoRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={TimexDashboard}
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

export default BasicInfoRoutes;
