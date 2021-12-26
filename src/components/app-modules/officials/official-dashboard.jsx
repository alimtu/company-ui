import React, { useState } from "react";
import { useMount } from "react-use";
import { Row, Col } from "antd";
import DashboardTile from "./../../common/dashboard-tile";
import {
  AiFillBank as OrgIcon,
  AiOutlineFieldTime as TimexIcon,
  AiOutlineDeploymentUnit as AutomationIcon,
} from "react-icons/ai";
import Colors from "./../../../resources/colors";
import modulesService from "./../../../services/app/modules-service";

const iconProps = {
  size: 55,
  style: { marginTop: 10 },
};

const mapper = (moduleID) => {
  let link = "";
  let icon = null;
  let backColor = Colors.blue[3];

  switch (moduleID) {
    case 2:
      link = "org";
      icon = <OrgIcon {...iconProps} />;
      backColor = Colors.blue[3];
      break;

    case 3:
      link = "timex";
      icon = <TimexIcon {...iconProps} />;
      backColor = Colors.orange[3];
      break;

    case 4:
      link = "automation";
      icon = <AutomationIcon {...iconProps} />;
      backColor = Colors.red[3];
      break;

    default:
      break;
  }

  return { link, icon, backColor };
};

const OfficialDashboard = () => {
  const [accessibleModules, setAccessibleModules] = useState([]);

  useMount(async () => {
    const official_category_id = 2;
    const accessibleModules = await modulesService.accessibleModules(
      official_category_id
    );

    setAccessibleModules(accessibleModules);
  });

  return (
    <Row gutter={[10, 16]}>
      {accessibleModules.map((module) => (
        <Col xs={24} md={8} lg={6} key={module.ModuleID}>
          <DashboardTile
            to={`official/${mapper(module.ModuleID).link}`}
            icon={mapper(module.ModuleID).icon}
            backColor={mapper(module.ModuleID).backColor}
            title={module.ModuleTitle}
          />
        </Col>
      ))}
    </Row>
  );
};

export default OfficialDashboard;
