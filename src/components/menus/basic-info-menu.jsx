import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { FaMapMarkerAlt as MapIcon } from "react-icons/fa";
import { GiModernCity as CityIcon } from "react-icons/gi";
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
    case 1:
      link = "provinces";
      icon = <MapIcon style={{ color: Colors.red[6] }} size={iconSize} />;
      break;

    case 2:
      link = "cities";
      icon = <CityIcon style={{ color: Colors.cyan[7] }} size={iconSize} />;
      break;

    default:
      break;
  }

  return { link, icon };
};

const BasicInfoMenu = (props) => {
  const [accessiblePages, setAccessiblePages] = useState([]);
  const [lastPathKey, setLastPathKey] = useState("");

  useMount(async () => {
    const basic_info_module_id = 1;
    const accessiblePages = await modulesService.accessiblePages(
      basic_info_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  useEffect(() => {
    const pathKeys = props.location.pathname.split("/");
    const _lastPathKey = pathKeys[pathKeys.length - 1]
      .replace("-", "")
      .toLocaleLowerCase();
    setLastPathKey(_lastPathKey);
  }, [props.location.pathname]);

  const basic_info_module_path_name = "basic-info";
  const isEndsWithModuleName = useLocation().pathname.endsWith(
    `/${basic_info_module_path_name}`
  );
  const prePath = isEndsWithModuleName ? `${basic_info_module_path_name}/` : "";

  return (
    <>
      <Menu mode="inline" theme="light" selectedKeys={[lastPathKey]}>
        <Menu.Item
          key="settings"
          icon={
            <DashboardIcon style={{ color: Colors.green[6] }} size={iconSize} />
          }
        >
          <Link to={`/home/settings`}>{Words.settings}</Link>
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
    </>
  );
};

export default BasicInfoMenu;
