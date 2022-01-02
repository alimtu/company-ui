import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Alert,
  Descriptions,
  Space,
} from "antd";
import { AiFillStar as StarIcon } from "react-icons/ai";
import Words from "../../../../resources/words";
import Colors from "../../../../resources/colors";
import utils from "../../../../tools/utils";
import MemberProfileImage from "../../../common/member-profile-image";

const { Text } = Typography;

const EmployeeDetailsModal = ({ employee, isOpen, onOk }) => {
  const valueColor = Colors.blue[7];

  return (
    <Modal
      visible={isOpen}
      maskClosable={false}
      centered={true}
      title={Words.more_details}
      footer={[
        <Button key="submit-button" type="primary" onClick={onOk}>
          {Words.confirm}
        </Button>,
      ]}
      onCancel={onOk}
      width={650}
    >
      <section>
        <article
          id="info-content"
          className="scrollbar-normal"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <Row gutter={[10, 10]}>
            <Col xs={24}>
              <Alert
                message={
                  <Space>
                    <MemberProfileImage fileName={employee.PicFileName} />
                    <Text>
                      {utils.farsiNum(
                        `#${employee.EmployeeID} - ${employee.FirstName} ${employee.LastName}`
                      )}
                    </Text>
                  </Space>
                }
                type="info"
              />
            </Col>
            <Col xs={24}>
              <Descriptions
                bordered
                column={{
                  //   md: 2, sm: 2,
                  lg: 2,
                  md: 2,
                  xs: 1,
                }}
                size="middle"
              >
                {employee.IsDepartmentManager && (
                  <Descriptions.Item label={Words.department_manager} span={2}>
                    {/* <Text style={{ color: valueColor }}>
                      {Words.department_manager}
                    </Text> */}
                    <StarIcon style={{ color: Colors.yellow[6] }} />
                  </Descriptions.Item>
                )}
                <Descriptions.Item label={Words.national_code}>
                  <Text style={{ color: valueColor }}>
                    {utils.farsiNum(`${employee.NationalCode}`)}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.mobile}>
                  <Text style={{ color: valueColor }}>
                    {utils.farsiNum(`${employee.Mobile}`)}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.department}>
                  <Text style={{ color: valueColor }}>
                    {utils.farsiNum(`${employee.DepartmentTitle}`)}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label={Words.role}>
                  <Text style={{ color: valueColor }}>
                    {utils.farsiNum(`${employee.RoleTitle}`)}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </article>
      </section>
    </Modal>
  );
};

export default EmployeeDetailsModal;
