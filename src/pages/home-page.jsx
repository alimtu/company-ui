import React from "react";
import {
  Layout,
  Typography,
  Drawer,
  Row,
  Col,
  Menu,
  Popover,
  Space,
  Button,
  Avatar,
  Divider,
} from "antd";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";
import PageRoutes from "../routes/page-routes";
import MenuRoutes from "../routes/menu-routes";
import { useToggle } from "react-use";
import Words from "../resources/words";
import Colors from "../resources/colors";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { isMobileView } from "../tools/general";
import { useLocation, Link } from "react-router-dom";
import BreadcrumbMap from "../components/common/breadcrumb-map";
// import logo from "../assets/images/mazust-white.png";
import { BiCaretDown, BiCaretLeft } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import MemberProfileImage from "../components/common/member-profile-image";
import { usePageContext } from "../components/contexts/page-context";
import { IoLogOutOutline } from "react-icons/io5";

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

const MainHeader = ({ mobileView, trigger, history }) => {
  const { picFileName, memberInfo } = usePageContext();
  const { FirstName, LastName } = memberInfo;

  const content = (
    <Space direction="vertical" align="start">
      <Space align="center" className="spaceAntd">
        <MemberProfileImage fileName={picFileName} />
        <Space align="start" direction="vertical">
          <Text
            style={{ fontWeight: "normal" }}
          >{`${FirstName}  ${LastName}`}</Text>
          <Text>
            <Link style={{ display: "flex", alignItems: "center" }}>
              {Words.see_profile} <BiCaretLeft />
            </Link>
          </Text>
        </Space>
      </Space>
      <Divider style={{ margin: "0px" }} />
      <Space align="center" className="spaceAntd">
        <IoLogOutOutline style={{ fontSize: "20px", marginTop: "7px" }} />
        <Text
          style={{ fontWeight: "normal", cursor: "pointer" }}
          onClick={() => history.push("/logout")}
        >
          {Words.logout_from_account}
        </Text>
      </Space>
    </Space>
  );

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

      <Popover content={content} placement="bottomLeft">
        <Button type="link" className="buttonAntd" style={{ color: "white" }}>
          <HiOutlineUser style={{ fontSize: "25px", fontWeight: "normal" }} />
          <BiCaretDown style={{ fontSize: "20px", fontWeight: "normal" }} />
        </Button>
      </Popover>
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
