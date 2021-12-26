import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  AiOutlineDashboard as DashboardIcon,
  AiOutlineCodepen as RoleIcon,
} from "react-icons/ai";
import {
  FaUsers as MemberIcon,
  FaIdCard as EmployeeIcon,
  FaUsersCog as AgentIcon,
} from "react-icons/fa";
import { BiUnite as DepartmentIcon } from "react-icons/bi";
import {
  RiBuilding2Fill as CompanyIcon,
  RiOrganizationChart as OrgChartIcon,
} from "react-icons/ri";
import { VscUngroupByRefType as DutyLevelIcon } from "react-icons/vsc";
import { GoTasklist as DutyIcon } from "react-icons/go";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import modulesService from "../../services/app/modules-service";
import Colors from "./../../resources/colors";
import Words from "./../../resources/words";
import { useLocation } from "react-router-dom";

const iconSize = 20;

const mapper = (pageID) => {
  let link = "";
  let icon = null;

  switch (pageID) {
    case 3:
      link = "departments";
      icon = (
        <DepartmentIcon style={{ color: Colors.green[6] }} size={iconSize} />
      );
      break;

    case 4:
      link = "org-chart";
      icon = (
        <OrgChartIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 5:
      link = "roles";
      icon = <RoleIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 6:
      link = "companies";
      icon = (
        <CompanyIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
      );
      break;

    case 7:
      link = "members";
      icon = (
        <MemberIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    case 8:
      link = "employees";
      icon = (
        <EmployeeIcon style={{ color: Colors.geekblue[6] }} size={iconSize} />
      );
      break;

    case 9:
      link = "company-agents";
      icon = <AgentIcon style={{ color: Colors.gold[7] }} size={iconSize} />;
      break;

    case 10:
      link = "duty-levels";
      icon = (
        <DutyLevelIcon style={{ color: Colors.magenta[5] }} size={iconSize} />
      );
      break;

    case 11:
      link = "duties";
      icon = <DutyIcon style={{ color: Colors.red[5] }} size={iconSize} />;
      break;

    default:
      break;
  }

  return { link, icon };
};

const OrgMenu = (props) => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  useMount(async () => {
    const org_module_id = 2;
    const accessiblePages = await modulesService.accessiblePages(org_module_id);

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = props.location.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [props.location.pathname]);

  const org_module_path_name = "org";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${org_module_path_name}`
  );
  const prePath = isEndsWithModuleName ? `${org_module_path_name}/` : "";

  return (
    <Menu mode="inline" theme="light" selectedKeys={[lastPathKey]}>
      <Menu.Item
        key="official"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home/official`}>{Words.official}</Link>
      </Menu.Item>
      <Menu.Divider />
      {accessiblePages.map((page) => (
        <Menu.Item
          key={page.PageName.replace("-", "").toLocaleLowerCase()}
          icon={mapper(page.PageID).icon}
        >
          <Link to={`${prePath}${mapper(page.PageID).link}`}>
            {page.PageTitle}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default OrgMenu;
