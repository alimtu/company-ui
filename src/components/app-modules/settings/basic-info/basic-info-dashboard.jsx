import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "../../../common/dashboard-tile";
import { FaMapMarkerAlt as MapIcon } from "react-icons/fa";
import { GiModernCity as CityIcon } from "react-icons/gi";
import Colors from "../../../../resources/colors";
import modulesService from "../../../../services/app/modules-service";

const iconProps = {
  size: 55,
  style: { marginTop: 10 },
};

const mapper = (pageID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (pageID) {
    case 1:
      link = "provinces";
      icon = <MapIcon {...iconProps} />;
      backColor = Colors.red[3];
      break;

    case 2:
      link = "cities";
      icon = <CityIcon {...iconProps} />;
      backColor = Colors.cyan[3];
      break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const OrgDashboard = () => {
  const [accessiblePages, setAccessiblePages] = useState([]);

  useMount(async () => {
    const basic_info_module_id = 1;
    const accessiblePages = await modulesService.accessiblePages(
      basic_info_module_id
    );

    setAccessiblePages(accessiblePages);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessiblePages.map((page) => (
        <Col xs={24} md={8} lg={6} key={page.PageID}>
          <DashboardTile
            to={`basic-info/${mapper(page.PageID).link}`}
            icon={mapper(page.PageID).icon}
            backColor={mapper(page.PageID).backColor}
            title={page.PageTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default OrgDashboard;
