import React, { useEffect } from "react";
import { Form, Input, Button, Select, notification, Modal } from "antd";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../store/UserList.jsx";

const departmentOptions = [
  { label: "IT", value: "IT" },
  { label: "Marketing", value: "Marketing" },
  { label: "Sales", value: "Sales" },
  { label: "Finance", value: "Finance" },
  { label: "HR", value: "HR" },
  { label: "Operations", value: "Operations" },
];

const UserAdd = ({ showUserModal, setShowUserModal, selectedRecord }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isEdit = Object.keys(selectedRecord).length > 0;

  const onFinish = async () => {
    try {
      const values = await form?.validateFields();
      values.Age = Number(values.Age);
      if (isEdit) {
        dispatch(
          updateUser({
            id: selectedRecord.id,
            values,
          })
        );
      } else {
        dispatch(addUser(values));
      }

      form?.resetFields();
      setShowUserModal(false);

      notification.success({
        message: "Success",
        description: isEdit
          ? "User updated successfully"
          : "User created successfully",
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleCancel = () => {
    setShowUserModal(false);
  };

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(selectedRecord);
    } else {
      form.resetFields();
    }
    // {} === {...}
    // {...} === {...}
  }, [selectedRecord, isEdit, form]);

  return (
    <Modal
      title={isEdit ? "Update User" : "Create User"}
      visible={showUserModal}
      onOk={onFinish}
      onCancel={handleCancel}
      maskClosable={false}
      okText={isEdit ? "Update" : "Create"}
      style={{ top: 200 }}
    >
      <Form
        onFinish={onFinish}
        form={form}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        labelAlign="left"
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: "Please enter the first name",
            },
            {
              pattern: /^[a-zA-Z ]*$/,
              message: "Please enter valid first name",
            },
            {
              max: 10,
              message: "First name must be less than 10 characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: "Please enter the last name",
            },
            {
              pattern: /^[a-zA-Z ]*$/,
              message: "Please enter valid last name",
            },
            {
              max: 10,
              message: "Last name must be less than 10 characters",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="Address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="Age"
          rules={[
            { required: true, message: "Please enter the age" },
            {
              pattern: /^[0-9]*$/,
              message: "Please enter valid age",
            },
            {
              max: 3,
              message: "Age must be less than 3 characters",
            },
            {
              validator: (_, value) => {
                if (value < 0) {
                  return Promise.reject("Age must be greater than 0");
                } else if (value > 100) {
                  return Promise.reject("Age must be less than 100");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="Department"
          rules={[{ required: true, message: "Please enter the department" }]}
        >
          <Select>
            {departmentOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[
            { required: true, message: "Please enter the avatar" },
            {
              type: "url",
              message: "Please enter valid url",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please enter the role" }]}
        >
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserAdd;
