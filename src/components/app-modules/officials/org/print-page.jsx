import React, { useEffect, useRef } from "react";
import { Layout, Space, Typography, Col } from "antd";
import Words from "../../../../resources/words";
import logo from "./../../../../assets/images/logo.png";
import utils from "../../../../tools/utils";
import authService from "../../../../services/auth-service";
import SimpleDataTable from "../../../common/simple-data-table";
import { getSorter } from "../../../../tools/form-manager";
import MemberProfileImage from "../../../common/member-profile-image";

const { Header, Footer, Content } = Layout;
const { Text, Title } = Typography;

export const PrintPage = React.forwardRef((props, ref) => {
  let { records, columns } = props;

  const memberInfo = authService.getCurrentUser();

  const baseColumns = [
    {
      title: Words.id,
      align: "center",
      // sorter: getSorter("MemberID"),
      dataIndex: "MemberID",
      render: (MemberID) => <Text>{utils.farsiNum(`${MemberID}`)}</Text>,
    },
    {
      title: "",
      align: "center",
      dataIndex: "PicFileName",
      render: (PicFileName) => <MemberProfileImage fileName={PicFileName} />,
    },
    {
      title: Words.full_name,
      align: "center",
      render: (record) => (
        <Text>{`${record.FirstName} ${record.LastName}`}</Text>
      ),
    },
    {
      title: Words.national_code,
      align: "center",
      ellipsis: true,
      dataIndex: "NationalCode",
      render: (NationalCode) => <Text>{utils.farsiNum(NationalCode)}</Text>,
    },
    {
      title: Words.mobile,
      align: "center",
      ellipsis: true,
      dataIndex: "Mobile",
      render: (Mobile) => <Text>{utils.farsiNum(Mobile)}</Text>,
    },
    {
      title: Words.fix_tel,
      align: "center",
      ellipsis: true,
      dataIndex: "FixTel",
      render: (FixTel) => <Text>{utils.farsiNum(FixTel)}</Text>,
    },
    {
      title: Words.province,
      align: "center",
      ellipsis: true,
      dataIndex: "ProvinceTitle",
      render: (ProvinceTitle) => <Text>{utils.farsiNum(ProvinceTitle)}</Text>,
    },
    {
      title: Words.city,
      align: "center",
      ellipsis: true,
      dataIndex: "CityTitle",
      render: (CityTitle) => <Text>{utils.farsiNum(CityTitle)}</Text>,
    },
  ];

  useEffect(() => {
    columns.forEach((element) => {
      delete element.width;
    });
    columns.pop();
    columns.push(
      {
        title: Words.fix_tel,
        align: "center",
        ellipsis: true,
        dataIndex: "FixTel",
        render: (FixTel) => <Text>{utils.farsiNum(FixTel)}</Text>,
      },
      {
        title: Words.province,
        align: "center",
        ellipsis: true,
        dataIndex: "ProvinceTitle",
        render: (ProvinceTitle) => <Text>{utils.farsiNum(ProvinceTitle)}</Text>,
      },
      {
        title: Words.city,
        align: "center",
        ellipsis: true,
        dataIndex: "CityTitle",
        render: (CityTitle) => <Text>{utils.farsiNum(CityTitle)}</Text>,
      }
    );
  }, []);

  return (
    <div ref={ref}>
      <Layout style={{ backgroundColor: "white" }}>
        <Header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            zIndex: 100,
            width: "100%",
            backgroundColor: "white",
            justifyContent: "center",
          }}
          className="page-header"
        >
          <Space align="center" size="large">
            <Title level={5}>{Words.fulad_bahman}</Title>
            <img src={logo} alt="app_company" />
            <Title level={5}>{Words.members}</Title>
          </Space>
        </Header>

        <Content
          style={{
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr>
              <td>
                <div className="page-header-space"></div>
              </td>
            </tr>
          </thead>
          {baseColumns && records && (
            <tbody>
              <tr>
                <td>
                  <div className="page " style={{ zoom: 0.85 }}>
                    <SimpleDataTable
                      records={records}
                      columns={baseColumns}
                      paginationOff={true}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          )}
          <tfoot>
            <tr>
              <td>
                <div className="page-footer-space"></div>
              </td>
            </tr>
          </tfoot>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          className="page-footer"
        >
          <Text>
            <Space align="center" size="large">
              {`${Words.current_user} :  ${memberInfo.FirstName} ${memberInfo.LastName}`}
              {`${Words.date}: ${utils.dayName(utils.getPersianDate())}`}
              {`${Words.time}: ${utils.farsiNum(utils.formattedFullTime())}`}
            </Space>

            {/* Another Example */}

            {/* <Space align="center" size="large">
              <Text>
                {`${Words.current_user} :  ${memberInfo.FirstName} ${memberInfo.LastName}`}
              </Text>
              <Text>
                {`${Words.date}: ${utils.dayName(utils.getPersianDate())}`}
              </Text>
              <Text>
                {`${Words.time}: ${utils.farsiNum(utils.formattedFullTime())}`}
              </Text>
            </Space> */}
          </Text>
        </Footer>
      </Layout>
    </div>
  );
});
