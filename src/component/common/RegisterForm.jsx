import React, { useState } from "react";
import { Form, Input, Button, DatePicker, notification, Spin } from "antd";
import { Link } from "react-router-dom";
import classes from "../../assets/styles/RegisterForm.module.scss";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const RegisterForm = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    console.log("Birthday:", values.birthday);

    if (!values.username || !values.password) {
      setVisible(true);
    } else {
      setVisible(true);
    }
  };

  return (
    <Form
      name="register-form"
      onFinish={onFinish}
      layout="vertical"
      className={classes.registerForm}
    >
      <Typography>
        <Title level={2}>Register</Title>
      </Typography>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 4, message: "Username must be at least 4 characters!" },
        ]}
        className={classes.formItem}
      >
        <Input
          placeholder="Username"
          className={classes.input}
          prefix={<UserOutlined className={classes.prefixIcon} />}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Invalid email address!" },
        ]}
        className={classes.formItem}
      >
        <Input
          placeholder="Email Address"
          className={classes.input}
          prefix={<MailOutlined className={classes.prefixIcon} />}
        />
      </Form.Item>
      <Form.Item
        label="Birthday"
        name="birthday"
        rules={[{ required: true, message: "Please select your birthday!" }]}
        className={classes.formItem}
      >
        <DatePicker
          placeholder="Select birthday"
          className={classes.input}
          format="DD/MM/YYYY"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters!" },
        ]}
        className={classes.formItem}
      >
        <Input.Password
          placeholder="Password"
          className={classes.input}
          prefix={<LockOutlined className={classes.prefixIcon} />}
        />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Passwords do not match!");
            },
          }),
        ]}
        className={classes.formItem}
      >
        <Input.Password
          placeholder="Confirm Password"
          className={classes.input}
          prefix={<LockOutlined className={classes.prefixIcon} />}
        />
      </Form.Item>

      <Form.Item className={classes.registerLink}>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={classes.registerButton}
        >
          Register
        </Button>
      </Form.Item>

      <Modal
        title="Confirm Registration"
        visible={visible}
        confirmLoading={loading}
        onOk={() => {
          setLoading(true);
          setVisible(false);
          setLoading(false);
          setShowSuccessIcon(true);
          notification.success({
            message: "Success",
            description: "Register successful!",
          });
        }}
        onCancel={() => setVisible(false)}
        className={classes.modal}
      >
        {showSuccessIcon ? (
          <div className={classes.successContainer}>
            <Spin spinning={loading} />
            <div className={classes.successIcon}>
              <CheckCircleOutlined
                style={{ fontSize: "48px", color: "#52c41a" }}
              />
            </div>
          </div>
        ) : (
          <p>Please confirm your registration.</p>
        )}
      </Modal>
    </Form>
  );
};

export default RegisterForm;
