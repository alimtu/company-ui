import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import MainMenu from "../components/menus/main-menu";
//---
import SettingsMenu from "../components/menus/settings-menu";
import BasicInfoMenu from "../components/menus/basic-info-menu";
//---
import OfficialMenu from "../components/menus/official-menu";
import OrgMenu from "../components/menus/org-menu";
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
