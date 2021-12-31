import React, { useState, useEffect } from "react";
import { useMount } from "react-use";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import modulesService from "../../../services/app/modules-service";
import Colors from "../../../resources/colors";
import Words from "../../../resources/words";
import TabTitle from "../../common/tab-title";
import {
  AiOutlineDashboard as DashboardIcon,
  AiOutlineNodeIndex as CalculationBaseIcon,
  AiOutlineAppstoreAdd as SavableIcon,
  AiOutlineSchedule as WorkShiftIcon,
  AiOutlineFieldTime as WorkTimeIcon,
} from "react-icons/ai";
import {
  GiGuards as SecurityguardIcon,
  GiSwipeCard as CardIcon,
} from "react-icons/gi";
import {
  MdFreeCancellation as HolidayIcon,
  MdCategory as CategoryIcon,
  MdSecurity as SecurityIcon,
  MdCalculate as CalculateIcon,
  MdCardTravel as VacationIcon,
  MdOutlineWork as MissionIcon,
} from "react-icons/md";
import {
  FaUsersCog as UsersIcon,
  FaUserClock as IndividualShiftIcon,
  FaChartPie as ChartIcon,
} from "react-icons/fa";
import {
  BiGitPullRequest as RequestIcon,
  BiGroup as GroupShiftIcon,
} from "react-icons/bi";
import { HiSaveAs as SaveIcon } from "react-icons/hi";

const { SubMenu } = Menu;

const iconSize = 20;

const mapper = (pageID) => {
  let link = "";
  let icon = null;

  switch (pageID) {
    //--- Security Tab
    case 12:
      link = "security-guards";
      icon = (
        <SecurityguardIcon style={{ color: Colors.green[6] }} size={iconSize} />
      );
      break;

    //--- Indexes Tab
    case 13:
      link = "holidays";
      icon = (
        <HolidayIcon style={{ color: Colors.orange[6] }} size={iconSize} />
      );
      break;

    case 14:
      link = "calculation-bases";
      icon = (
        <CalculationBaseIcon
          style={{ color: Colors.orange[6] }}
          size={iconSize}
        />
      );
      break;

    //--- Vacations Tab
    case 15:
      link = "vacation-types";
      icon = <CategoryIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 16:
      link = "vacation-managers";
      icon = <UsersIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 17:
      link = "vacation-requests";
      icon = <RequestIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 18:
      link = "savable-vacations";
      icon = <SavableIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    case 19:
      link = "saved-vacations";
      icon = <SaveIcon style={{ color: Colors.blue[6] }} size={iconSize} />;
      break;

    //--- Missions Tab
    case 20:
      link = "mission-types";
      icon = (
        <CategoryIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
      );
      break;

    case 21:
      link = "mission-managers";
      icon = <UsersIcon style={{ color: Colors.volcano[6] }} size={iconSize} />;
      break;

    case 22:
      link = "mission-requests";
      icon = (
        <RequestIcon style={{ color: Colors.volcano[6] }} size={iconSize} />
      );
      break;

    //--- WorkTime Info Tab
    case 23:
      link = "work-shift-managers";
      icon = <UsersIcon style={{ color: Colors.magenta[6] }} size={iconSize} />;
      break;

    case 24:
      link = "work-shifts";
      icon = (
        <WorkShiftIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    case 25:
      link = "group-shifts";
      icon = (
        <GroupShiftIcon style={{ color: Colors.magenta[6] }} size={iconSize} />
      );
      break;

    case 26:
      link = "individual-shifts";
      icon = (
        <IndividualShiftIcon
          style={{ color: Colors.magenta[6] }}
          size={iconSize}
        />
      );
      break;

    case 27:
      link = "reged-cards";
      icon = <CardIcon style={{ color: Colors.magenta[6] }} size={iconSize} />;
      break;

    // Colors.geekblue[6]
    // Colors.gold[7]
    // Colors.magenta[5]
    // Colors.red[5]

    default:
      break;
  }

  return { link, icon };
};

const tabs = [
  {
    name: "security",
    title: (
      <TabTitle
        title={Words.security}
        color={Colors.green[6]}
        icon={SecurityIcon}
      />
    ),
    pages: [{ pageName: "SecurityGuards" }],
  },
  {
    name: "indexes",
    title: (
      <TabTitle
        title={Words.indexes}
        color={Colors.orange[6]}
        icon={CalculateIcon}
      />
    ),
    pages: [{ pageName: "Holidays" }, { pageName: "CalculationBases" }],
  },
  {
    name: "vacations",
    title: (
      <TabTitle
        title={Words.vacations}
        color={Colors.blue[6]}
        icon={VacationIcon}
      />
    ),
    pages: [
      { pageName: "VacationTypes" },
      { pageName: "VacationManagers" },
      { pageName: "VacationRequests" },
      { pageName: "AnnualSavableVacations" },
      { pageName: "SavedVacations" },
    ],
  },
  {
    name: "missions",
    title: (
      <TabTitle
        title={Words.missions}
        color={Colors.volcano[6]}
        icon={MissionIcon}
      />
    ),
    pages: [
      { pageName: "MissionTypes" },
      { pageName: "MissionManagers" },
      { pageName: "MissionRequests" },
    ],
  },
  {
    name: "work_time_info",
    title: (
      <TabTitle
        title={Words.work_time_info}
        color={Colors.magenta[6]}
        icon={WorkTimeIcon}
      />
    ),
    pages: [
      { pageName: "WorkShiftManagers" },
      { pageName: "WorkShifts" },
      { pageName: "GroupShifts" },
      { pageName: "IndividualShifts" },
      { pageName: "RegedCards" },
    ],
  },
  {
    name: "reports",
    title: (
      <TabTitle
        title={Words.reports}
        color={Colors.geekblue[6]}
        icon={ChartIcon}
      />
    ),
    pages: [],
  },
];

const SettingsTimexMenu = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");
  const [openKeys, setOpenKeys] = React.useState([]);

  const currentLocation = useLocation();

  useMount(async () => {
    const timex_settings_module_id = 5;
    const accessiblePages = await modulesService.accessiblePages(
      timex_settings_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = currentLocation.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("-", "")
      .toLocaleLowerCase();

    setLastPathKey(_lastPathKey);

    const parentTab = getParentTab(_lastPathKey);
    if (parentTab !== null) setOpenKeys([parentTab.name]);
  }, [currentLocation.pathname]);

  const getParentTab = (pageName) => {
    let tab = null;

    tab = tabs.find(
      (t) =>
        t.pages.filter(
          (p) => p.pageName.replace("-", "").toLocaleLowerCase() === pageName
        ).length > 0
    );

    tab = tab || null;

    return tab;
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    let rootSubmenuKeys = [];
    tabs.forEach((t) => (rootSubmenuKeys = [...rootSubmenuKeys, t.name]));

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const getSubMenus = () => {
    const timex_module_path_name = "timex";
    const isEndsWithModuleName = currentLocation.pathname.endsWith(
      `/${timex_module_path_name}`
    );
    const prePath = isEndsWithModuleName ? `${timex_module_path_name}/` : "";

    //---

    let subMenus = [];

    tabs.forEach((tab) => {
      if (
        accessiblePages.filter((p) =>
          tab.pages.filter((tp) => tp.pageName === p.PageName)
        ).length > 0
      ) {
        subMenus = [
          ...subMenus,
          <SubMenu key={tab.name} title={tab.title}>
            {accessiblePages
              .filter(
                (ap) =>
                  tab.pages.filter((tp) => tp.pageName === ap.PageName)
                    .length === 1
              )
              .map((page) => (
                <Menu.Item
                  key={page.PageName.replace("-", "").toLocaleLowerCase()}
                  icon={mapper(page.PageID).icon}
                >
                  <Link to={`${prePath}${mapper(page.PageID).link}`}>
                    {page.PageTitle}
                  </Link>
                </Menu.Item>
              ))}
          </SubMenu>,
        ];
      }
    });

    return subMenus;
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      openKeys={openKeys}
      selectedKeys={[lastPathKey]}
      onOpenChange={onOpenChange}
    >
      <Menu.Item
        key="settings"
        icon={
          <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
        }
      >
        <Link to={`/home/settings`}>{Words.settings}</Link>
      </Menu.Item>
      <Menu.Divider />

      {getSubMenus()}
    </Menu>
  );
};

export default SettingsTimexMenu;
