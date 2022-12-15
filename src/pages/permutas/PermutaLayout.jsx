import React, { useEffect, useState } from "react";
import {
  FileSearchOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Header from "../../components/Layout/Header";
import Incluir from "./Incluir";
import Consultar from "./Consultar";
import Manifestacoes from "./Manifestacoes";
import UserProfile from "./UserProfile";
import PainelAdmin from "./PainelAdmin";

const { Sider, Content } = Layout;

const PermutaLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [clickedItem, setClickedItem] = useState("2");
  const [page, setPage] = useState(<Incluir />);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [menuItems, setMenuItems] = useState([
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
  ]);

  const isAdmin = JSON.parse(localStorage.getItem("loggedInUser"))["user"][
    "isAdmin"
  ];

  useEffect(() => {
    if (isAdmin) {
      setMenuItems(prev => {
        if (prev.length === 5) return prev;

        const newList = [
          ...prev,
          {
            key: "5",
            icon: <LaptopOutlined />,
            label: "Painel do administrador",
          },
        ];
        return newList;
      });
    }
  }, [isAdmin]);

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
      case "5":
        setPage(<PainelAdmin />);
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
              color: "#212529",
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
            defaultSelectedKeys={["2"]}
            selectedKeys={[clickedItem]}
            items={menuItems}
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
