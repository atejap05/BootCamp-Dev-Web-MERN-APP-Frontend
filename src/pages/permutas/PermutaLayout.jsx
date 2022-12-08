import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Header from "../../components/Layout/Header";
const { Sider, Content } = Layout;
const PermutaLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Header />
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={400}
          className="light-bg"
        >
          <div
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: "2.4rem",
              padding: ".8rem",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Incluir Inteção",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Consultar Disponíveis",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Histórico",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "Minhas Manifestações",
              },
            ]}
          />
        </Sider>
        <Content
          style={{
            margin: "2.4rem 1.6rem",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </>
  );
};
export default PermutaLayout;
