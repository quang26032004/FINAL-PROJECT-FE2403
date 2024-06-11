import { Table, Button, Modal, Popconfirm, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { getUserList, deleteUser, setUserDetail } from "../../store/UserList";
import { Space } from "antd";
import { Input } from "antd";
import classes from "../../../assets/styles/UserApp.module.scss";
import UserModal from "./UserModal";
import { Spin } from "antd";
import { getUserInfo } from "../../../utils/helpers";
import { render } from "react-dom";
const { Search } = Input;
import { Typography } from "antd";
import { Row, Col } from "antd";
import { Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QqOutlined,
  UserOutlined,
} from "@ant-design/icons";

const ageOptions = [
  { value: "10-20", label: "Age 10 - 20" },
  { value: "20-30", label: "Age 20 - 30" },
  { value: "30-40", label: "Age 30 - 40" },
  { value: "40+", label: "Age 40 up to" },
];

const departmentOptions = [
  { label: "IT", value: "IT" },
  { label: "Marketing", value: "Marketing" },
  { label: "Sales", value: "Sales" },
  { label: "Finance", value: "Finance" },
  { label: "HR", value: "HR" },
  { label: "Operations", value: "Operations" },
];

const UserApp = () => {
  const dispatch = useDispatch();
  const { UserList, status } = useSelector((store) => store.UserAPI);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [ageRange, setAgeRange] = useState();
  const [department, setDepartment] = useState();
  const userInfo = getUserInfo();
  const isAdmin = userInfo.role === "admin";

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "firstName",
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "lastName",
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "address",
      sorter: (a, b) => a.Address.localeCompare(b.Address),
    },
    {
      title: "Age",
      dataIndex: "Age",
      key: "age",
      sorter: (a, b) => a.Age - b.Age,
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "department",
      sorter: (a, b) => a.Department.localeCompare(b.Department),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <Image src={text} width={50} />,
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <span>
          {text === "admin" ? (
            <Tag color="blue" icon={<UserOutlined />}>
              Admin
            </Tag>
          ) : (
            <Tag icon={<QqOutlined />} color="green">
              User
            </Tag>
          )}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle" align="center">
          {isAdmin && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className={classes.editButton}
            >
              Edit
            </Button>
          )}
          {isAdmin && record.role !== "admin" && (
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => dispatch(deleteUser(record.id))}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
                className={classes.deleteButton}
              >
                Delete
              </Button>
            </Popconfirm>
          )}
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleDetail(record)}
            className={classes.detailButton}
          >
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setShowUserModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleDetail = (record) => {
    dispatch(setUserDetail(record));
    setSelectedRecord(record);
    setDetailModalVisible(true);
  };

  const onSearch = (value) => {
    dispatch(
      getUserList({
        first_name_like: value.toLowerCase(),
      })
    );
  };

  const onSearchAge = (value) => {
    setAgeRange(value);
    console.log(value);
    if (value) {
      const [start, end] = value.split("-");
      dispatch(
        getUserList({
          Age_gte: start,
          Age_lte: end,
        })
      );
    } else {
      dispatch(getUserList({}));
    }
  };

  const onSearchDepartment = (value) => {
    setDepartment(value);
    if (value) {
      dispatch(
        getUserList({
          Department: value,
        })
      );
    } else {
      dispatch(getUserList({}));
    }
  };

  const onAddNewUser = () => {
    setShowUserModal(true);
    setSelectedRecord({});
  };

  return (
    <div className={classes.container}>
      {status === "loading" && (
        <div className={classes.loadingContainer}>
          <Spin size="large" />
        </div>
      )}
      <h1>User App</h1>
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <Space size="middle" align="center">
          {isAdmin && (
            <Button
              type="primary"
              onClick={onAddNewUser}
              className={classes.addUserButton}
            >
              Add New User
            </Button>
          )}
          <Search
            placeholder="Enter user name to search"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={onSearch}
          />
          <Select
            value={ageRange}
            onChange={onSearchAge}
            options={ageOptions}
            placeholder="Age Range"
            allowClear
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ minWidth: 150 }}
          />
          <Select
            value={department}
            onChange={onSearchDepartment}
            options={departmentOptions}
            placeholder="Department"
            allowClear
            dropdownMatchSelectWidth={false}
            dropdownStyle={{ minWidth: 150 }}
          />
        </Space>
      </div>

      {isAdmin && (
        <UserModal
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
          selectedRecord={selectedRecord}
        />
      )}

      <Modal
        title={<h2>User Detail</h2>}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        maskClosable={false}
        centered
        footer={null}
      >
        <Image src={selectedRecord?.avatar} width={150} />
        <Row>
          <Col span={8}>
            <Typography.Title level={3} strong>
              First Name:
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Typography.Title level={3}>
              {selectedRecord?.first_name}
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Title level={3} strong>
              Last Name:
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Typography.Title level={3}>
              {selectedRecord?.last_name}
            </Typography.Title>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Typography.Title level={3} strong>
              Address:
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Typography.Title level={3}>
              {selectedRecord?.Address}
            </Typography.Title>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Typography.Title level={3} strong>
              Age:
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Typography.Title level={3}>{selectedRecord?.Age}</Typography.Title>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Typography.Title level={3} strong>
              Department:
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Typography.Title level={3}>
              {selectedRecord?.Department}
            </Typography.Title>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Typography.Title level={3} strong>
              Role:
            </Typography.Title>
          </Col>
          <Col span={8}>
            {selectedRecord?.role === "admin" ? (
              <Tag
                color="blue"
                icon={<UserOutlined />}
                style={{ fontSize: 18 }}
              >
                Admin
              </Tag>
            ) : (
              <Tag color="green" icon={<QqOutlined />} style={{ fontSize: 18 }}>
                User
              </Tag>
            )}
          </Col>
        </Row>
      </Modal>

      <Table
        columns={columns}
        dataSource={UserList}
        className={classes.table}
      />
    </div>
  );
};

export default UserApp;
