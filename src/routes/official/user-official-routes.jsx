import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
import UserOfficialDashboard from "../../components/app-modules/official/user-official-dashboard";
import UserOrgRoutes from "./user-org-routes";
//---

const UserOfficialRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/official`}
        exact
        component={UserOfficialDashboard}
      />
      <ProtectedRoute
        path={`${path}/official/org`}
        render={() => <UserOrgRoutes path={path} />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default UserOfficialRoutes;
