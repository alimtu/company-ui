import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Words from "../../resources/words";

const BreadcrumbMap = ({ location }) => {
  const breadcrumbNameMap = {
    "/home": Words.dashboard,
    "/home/official": Words.official,
    "/home/official/org": Words.orgAffairs,
    "/home/official/automation": Words.automation,
    "/home/settings": Words.settings,
    "/home/settings/basic-info": Words.basic_settings,
    "/home/settings/timex": Words.timex_settings,
    "/home/settings/accesses": Words.accesses,
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const getBreadcrumbItems = () => {
    let breadcrumbItems = [];

    pathSnippets.forEach((p, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      if (breadcrumbNameMap[url]) {
        breadcrumbItems = [
          ...breadcrumbItems,
          <Breadcrumb.Item key={`${index}_${url}`}>
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          </Breadcrumb.Item>,
        ];
      }
    });

    return breadcrumbItems;
  };

  return (
    <Breadcrumb
      style={{
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        overflow: "initial",
      }}
    >
      {getBreadcrumbItems()}
    </Breadcrumb>
  );
};

export default BreadcrumbMap;
