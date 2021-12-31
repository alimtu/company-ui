import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainMenu from "../components/menus/main-menu";
//---
import SettingsMenu from "../components/menus/settings/settings-menu";
import BasicInfoMenu from "../components/menus/settings/basic-info-menu";
import SettingsTimexMenu from "../components/menus/settings/settings-timex-menu";
//---
import SettingsAccessesMenu from "../components/menus/settings/settings-accesses-menu";
//---
import OfficialMenu from "../components/menus/official/official-menu";
import OrgMenu from "../components/menus/official/org-menu";
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
        path={`${path}/settings/basic-info`}
        component={BasicInfoMenu}
      />
      <ProtectedRoute
        path={`${path}/settings/timex`}
        component={SettingsTimexMenu}
      />
      <ProtectedRoute
        path={`${path}/settings/accesses`}
        component={SettingsAccessesMenu}
      />
      <ProtectedRoute
        path={`${path}/official`}
        exact
        component={OfficialMenu}
      />
      <ProtectedRoute path={`${path}/official/org`} component={OrgMenu} />
      <ProtectedRoute path={`${path}/`} exact component={MainMenu} />
    </Switch>
  );
};

export default MenuRoutes;
