import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainMenu from "../components/menus/main-menu";
//---
import SettingsMenu from "../components/menus/settings/settings-menu";
import AccessesMenu from "../components/menus/settings/accesses-menu";
import BasicInfoMenu from "../components/menus/settings/basic-info-menu";
import OrgMenu from "../components/menus/settings/org-menu";
import TimexMenu from "../components/menus/settings/timex-menu";
//---

const MenuRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/settings`}
        exact
        component={SettingsMenu}
      />
      <ProtectedRoute
        path={`${path}/settings/accesses`}
        component={AccessesMenu}
      />
      <ProtectedRoute
        path={`${path}/settings/basic-info`}
        component={BasicInfoMenu}
      />
      <ProtectedRoute path={`${path}/settings/org`} component={OrgMenu} />
      <ProtectedRoute path={`${path}/settings/timex`} component={TimexMenu} />

      <ProtectedRoute path={`${path}/`} exact component={MainMenu} />
    </Switch>
  );
};

export default MenuRoutes;
