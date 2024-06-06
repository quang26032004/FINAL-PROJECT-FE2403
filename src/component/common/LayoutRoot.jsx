import React from "react";
import HeaderPart from "./HeaderPart";
import LoginForm from "./LoginForm";
import FooterPart from "./FooterPart";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";
import AuthLayout from "../example/AuthLayout";
import RegisterForm from "./RegisterForm";
import classes from "../../assets/styles/LayoutRoot.module.scss";

function LayoutRoot() {
  return (
    <div
      className={classes.layoutRoot}
    >
      <HeaderPart />
      <Outlet />
      <FooterPart />
    </div>
  );
}

export default LayoutRoot;
