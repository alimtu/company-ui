import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/protected-route";
import OfficialDashboard from "../components/app-modules/officials/official-dashboard";
import OrgDashboard from "../components/app-modules/officials/org/org-dashboard";
import RolesPage from "../components/app-modules/officials/org/roles-page";
import DepartmentsPage from "../components/app-modules/officials/org/departments-page";
import CompaniesPage from "../components/app-modules/officials/org/companies-page";
import MembersPage from "../components/app-modules/officials/org/members-page";
import EmployeesPage from "../components/app-modules/officials/org/employees-page";
import CompanyAgentsPage from "../components/app-modules/officials/org/company-agents-page";
import OrgChartPage from "../components/app-modules/officials/org/org-chart-page";
import DutyLevelsPage from "../components/app-modules/officials/org/duty-levels-page";
import DutiesPage from "../components/app-modules/officials/org/duties-page";
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
        exact
        component={OrgDashboard}
      />
      <ProtectedRoute
        path={`${path}/official/org/roles`}
        exact
        render={() => <RolesPage pageName="Roles" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/departments`}
        exact
        render={() => <DepartmentsPage pageName="Departments" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/companies`}
        exact
        render={() => <CompaniesPage pageName="Companies" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/members`}
        exact
        render={() => <MembersPage pageName="Members" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/employees`}
        exact
        render={() => <EmployeesPage pageName="Employees" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/company-agents`}
        exact
        render={() => <CompanyAgentsPage pageName="CompanyAgents" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/org-chart`}
        exact
        render={() => <OrgChartPage pageName="OrgChart" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/duty-levels`}
        exact
        render={() => <DutyLevelsPage pageName="DutyLevels" />}
      />
      <ProtectedRoute
        path={`${path}/official/org/duties`}
        exact
        render={() => <DutiesPage pageName="Duties" />}
      />
    </Switch>
  );
};

export default OfficialRoutes;
