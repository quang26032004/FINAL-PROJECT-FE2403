import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "antd";
import classes from "../../assets/styles/LoginForm.module.scss"; // Import the updated CSS file
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../store/UserList";

const { Title } = Typography;

const LoginForm = () => {
  const { UserList } = useSelector((store) => store.UserAPI);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const onFinish = (values) => {
    if (!values.username || !values.password) {
      notification.error({
        message: "Error",
        description: "Please input your username and password!",
      });
    } else {
      const user = UserList.find(
        (item) =>
          item.username === values.username && item.password === values.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        notification.success({
          message: "Success",
          description: "Login successful!",
        });
        navigate("/");
      } else {
        notification.error({
          message: "Error",
          description: "Incorrect username or password. Please try again.",
        });
      }
    }
  };

  return (
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className={classes.loginForm}
    >
      <Typography>
        <Title level={2} className={classes.title}>
          Login
        </Title>
      </Typography>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
        className={classes.formItem}
      >
        <Input
          size="large"
          placeholder="Username"
          prefix={<UserOutlined />}
          className={classes.input}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        className={classes.formItem}
      >
        <Input.Password
          size="large"
          placeholder="Password"
          prefix={<LockOutlined />}
          className={classes.input}
        />
      </Form.Item>

      <Form.Item>
        <p className={classes.registerLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={classes.loginButton}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
