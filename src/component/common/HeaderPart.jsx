import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import { FormOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../assets/academy-02-01-01-01.png";
import classes from "../../assets/styles/Header.module.scss";
import { getUserInfo } from "../../utils/helpers";

const { Header } = Layout;

const greetings = [
  "Have a nice day",
  "Good morning",
  "Hello",
  "Hola, me llamo",
  "Bonjour",
  "こんにちは",
  "녕하세요",
  "你好",
];

const HeaderPart = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Layout>
      <Header
        className={classes.header}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">
          {userInfo.avatar ? (
            <Avatar src={userInfo.avatar} alt="User Avatar" />
          ) : (
            <Avatar icon={<UserOutlined />} alt="Default Avatar" />
          )}
        </Link>
        <h2 style={{ color: "white", marginLeft: 20 }}>
          {greetings[Math.floor(Math.random() * greetings.length)]},{" "}
          {userInfo.first_name}!
        </h2>

        <img src={logo} alt="logo" className={classes.logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          className={classes.menu}
        >
          <Menu.Item key="1" icon={<FormOutlined />}>
            <Link to="/user-list" className={classes.menuLink}>
              UserList
            </Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<LogoutOutlined />}>
            <span onClick={handleLogOut} className={classes.menuLink}>
              Log Out
            </span>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default HeaderPart;
