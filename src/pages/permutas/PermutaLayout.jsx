import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Header from "../../components/Layout/Header";
import Incluir from "./Incluir";
import Consultar from "./Consultar";
import Historico from "./Historico";
import Manifestacoes from "./Manifestacoes";
import UserProfile from "./UserProfile";
const { Sider, Content } = Layout;
const PermutaLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [clickedItem, setClickedItem] = useState("1");
  const [page, setPage] = useState(<Incluir />);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClickMenu = e => {
    setClickedItem(e.key);

    switch (e.key) {
      case "1":
        setPage(<UserProfile />);
        break;
      case "2":
        setPage(<Incluir />);
        break;
      case "3":
        setPage(<Consultar />);
        break;
      case "4":
        setPage(<Manifestacoes />);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <Layout>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={400}
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
            onClick={onClickMenu}
            theme="light"
            mode="inline"
            style={{ fontSize: "1.8rem" }}
            defaultSelectedKeys={["1"]}
            selectedKeys={[clickedItem]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Meu Perfil",
              },
              {
                key: "2",
                icon: <UsergroupAddOutlined />,
                label: "Incluir Intenção",
              },
              {
                key: "3",
                icon: <FileSearchOutlined />,
                label: "Consultar Disponíveis",
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
          {page}
        </Content>
      </Layout>
    </>
  );
};
export default PermutaLayout;
