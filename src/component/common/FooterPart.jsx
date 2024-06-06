import React from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import classes from "../../assets/styles/Footer.module.scss";
import logofooter from "../../assets/academy-02-01-01-01.png";

const { Footer } = Layout;

const FooterPart = () => {
  return (
    <Footer className={classes.footer}>
      <Row justify="space-between" align="middle" className={classes.footerRow}>
        <Col span={8} className={classes.footerCol}>
          <Link to="/">
            <img src={logofooter} alt="logo" className={classes.logo} />
          </Link>
        </Col>
        <Col span={8} className={classes.footerCol}>
          <ul className={classes.footerMenu}>
            <li className={classes.menuItem}>
              <Link to="/" className={classes.menuItemLink}>
                Home
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link to="/about" className={classes.menuItemLink}>
                About
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link to="/contact" className={classes.menuItemLink}>
                Contact
              </Link>
            </li>
          </ul>
        </Col>
        <Col span={8}>
          <div className={classes.socialIcons}>
            <InstagramOutlined
              className={classes.socialIcon}
              style={{ fontSize: "1.5rem", margin: "0 1rem" }}
            />
            <FacebookOutlined
              className={classes.socialIcon}
              style={{ fontSize: "1.5rem", margin: "0 1rem" }}
            />
            <TwitterOutlined
              className={classes.socialIcon}
              style={{ fontSize: "1.5rem", margin: "0 1rem" }}
            />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <div className={classes.footerBottom}>
            <p className={classes.footerText}
            >VTI Academy © 2024. All Rights Reserved.</p>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterPart;
