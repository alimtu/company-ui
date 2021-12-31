import React from "react";
import { Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "../../components/common/protected-route";
//---
import OrgDashboard from "../../components/app-modules/officials/org/org-dashboard";
import RolesPage from "../../components/app-modules/officials/org/roles-page";
import DepartmentsPage from "../../components/app-modules/officials/org/departments-page";
import CompaniesPage from "../../components/app-modules/officials/org/companies-page";
import MembersPage from "../../components/app-modules/officials/org/members-page";
import EmployeesPage from "../../components/app-modules/officials/org/employees-page";
import CompanyAgentsPage from "../../components/app-modules/officials/org/company-agents-page";
import OrgChartPage from "../../components/app-modules/officials/org/org-chart-page";
import DutyLevelsPage from "../../components/app-modules/officials/org/duty-levels-page";
import DutiesPage from "../../components/app-modules/officials/org/duties-page";
//---

const modulePath = "official/org";

const OrgRoutes = ({ path }) => {
  return (
    <Switch>
      <ProtectedRoute
        path={`${path}/${modulePath}`}
        exact
        component={OrgDashboard}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/roles`}
        exact
        render={() => <RolesPage pageName="Roles" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/departments`}
        exact
        render={() => <DepartmentsPage pageName="Departments" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/companies`}
        exact
        render={() => <CompaniesPage pageName="Companies" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/members`}
        exact
        render={() => <MembersPage pageName="Members" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/employees`}
        exact
        render={() => <EmployeesPage pageName="Employees" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/company-agents`}
        exact
        render={() => <CompanyAgentsPage pageName="CompanyAgents" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/org-chart`}
        exact
        render={() => <OrgChartPage pageName="OrgChart" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/duty-levels`}
        exact
        render={() => <DutyLevelsPage pageName="DutyLevels" />}
      />
      <ProtectedRoute
        path={`${path}/${modulePath}/duties`}
        exact
        render={() => <DutiesPage pageName="Duties" />}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default OrgRoutes;
