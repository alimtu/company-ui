import React from "react";
import { Layout, Typography, Drawer, Row, Col, Popconfirm, Space } from "antd";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";
import { AiOutlinePoweroff as LogoutIcon } from "react-icons/ai";
import PageRoutes from "../routes/page-routes";
import MenuRoutes from "../routes/menu-routes";
import { useToggle } from "react-use";
import Words from "../resources/words";
import Colors from "../resources/colors";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { isMobileView } from "../tools/general";
import { useLocation } from "react-router-dom";
import BreadcrumbMap from "../components/common/breadcrumb-map";
// import logo from "../assets/images/mazust-white.png";

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const MainHeader = ({ mobileView, trigger, history }) => {
  return (
    <Header
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "fixed",
        zIndex: 100,
        width: "100%",
        paddingRight: 15,
        backgroundColor: "purple",
      }}
    >
      {!mobileView ? (
        <>
          {/* <img
            src={logo}
            alt={Words.app_name}
            style={{ width: 35, marginLeft: 10 }}
          /> */}
        </>
      ) : (
        <MenuIcon
          style={{
            color: Colors.white,
            fontSize: 20,
            marginLeft: 10,
            marginRight: 5,
          }}
          onClick={trigger}
        />
      )}

      <div
        style={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Title
          level={!mobileView ? 4 : 5}
          style={{
            color: Colors.silver,
            // marginTop: 15,
          }}
        >
          {Words.app_name}
        </Title>
      </div>

      <Popconfirm
        title={Words.questions.sure_to_logout}
        onConfirm={() => history.push("/logout")}
        okText={Words.yes}
        cancelText={Words.no}
      >
        <LogoutIcon
          style={{ color: Colors.white, cursor: "pointer" }}
          size={20}
        />
      </Popconfirm>
    </Header>
  );
};

const MainFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <Text className="captionText">{Words.copyright}</Text>
    </Footer>
  );
};

const PageSidebar = ({ path, mobileView, drawer, trigger }) => {
  return (
    <>
      {mobileView && drawer && (
        <Drawer
          title={Words.main_menu}
          placement="right"
          closable={true}
          onClose={trigger}
          visible={drawer}
          bodyStyle={{ padding: 0 }}
          width={240}
        >
          <div className="scrollbar-normal">
            <MenuRoutes path={path} />
          </div>
        </Drawer>
      )}

      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        width={240}
        style={{
          overflow: "auto",
          height: "calc(100vh - 64px)",
          position: "fixed",
          right: 0,
          marginTop: 64,
          backgroundColor: Colors.white,
        }}
        className="scrollbar-normal"
      >
        <MenuRoutes path={path} />
      </Sider>
    </>
  );
};

const HomePage = (props) => {
  const [drawer, setDrawer] = useToggle(false);

  const mobileView = isMobileView(useWindowWidthBreakpoints);

  const location = useLocation();

  //------

  return (
    <Layout>
      <MainHeader
        mobileView={mobileView}
        trigger={setDrawer}
        history={props.history}
      />

      <Content>
        <Row>
          <Col xs={24}>
            <PageSidebar
              mobileView={mobileView}
              drawer={drawer}
              trigger={setDrawer}
              path={props.match.path}
            />

            <Layout
              style={{
                marginRight: !mobileView ? 240 : 0,
                marginTop: 63,
              }}
            >
              <Space direction="vertical">
                <BreadcrumbMap location={location} />

                <Content
                  style={
                    !mobileView
                      ? {
                          // marginTop: 16,
                          marginLeft: 16,
                          marginRight: 16,
                          overflow: "initial",
                        }
                      : {
                          overflow: "initial",
                        }
                  }
                >
                  <div
                    id="app-container"
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 350 }}
                  >
                    <PageRoutes path={props.match.path} />
                  </div>
                </Content>
              </Space>

              <MainFooter />
            </Layout>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
