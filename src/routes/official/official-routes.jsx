import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
import OfficialDashboard from "../../components/app-modules/officials/official-dashboard";
import OrgRoutes from "./org-routes";
//---

const OfficialRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/official`}
        exact
        component={OfficialDashboard}
      />
      <ProtectedRoute
        path={`${path}/official/org`}
        render={() => <OrgRoutes path={path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default OfficialRoutes;
