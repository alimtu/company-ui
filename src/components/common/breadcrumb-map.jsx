import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Words from "../../resources/words";

const BreadcrumbMap = ({ location }) => {
  const breadcrumbNameMap = {
    "/home": Words.dashboard,
    "/home/official": Words.official,
    "/home/official/org": Words.orgAffairs,
    "/home/official/timex": Words.timex,
    "/home/official/automation": Words.automation,
    "/home/settings": Words.settings,
    "/home/settings/basic-info": Words.basic_settings,
  };

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    return (
      <>
        {breadcrumbNameMap[url] && (
          <Breadcrumb.Item key={`${index}_${url}`}>
            <Link to={url}>{breadcrumbNameMap[url]}</Link>
          </Breadcrumb.Item>
        )}
      </>
    );
  });

  return (
    <Breadcrumb
      style={{
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        overflow: "initial",
      }}
    >
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default BreadcrumbMap;
