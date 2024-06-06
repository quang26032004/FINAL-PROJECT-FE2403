import { Table, Button, Modal, Popconfirm, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { getUserList, deleteUser, setUserDetail } from "../../store/UserList";
import { Flex } from "antd";
import { Input } from "antd";
import classes from "../../../assets/styles/UserApp.module.scss";
import UserModal from "./UserModal";
import { Spin } from "antd";
import { getUserInfo } from "../../../utils/helpers";
const { Search } = Input;

const ageOptions = [
  { value: "10-20", label: "Age 10 - 20" },
  { value: "20-30", label: "Age 20 - 30" },
  { value: "30-40", label: "Age 30 - 40" },
  { value: "40+", label: "Age 40 up to" },
];

const UserApp = () => {
  const dispatch = useDispatch();
  const { UserList, status } = useSelector((store) => store.UserAPI);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [ageRange, setAgeRange] = useState();
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
      filters: [
        { text: "A > Z", value: "A > Z" },
        { text: "Z > A", value: "Z > A" },
      ],
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "lastName",
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      filters: [
        { text: "A > Z", value: "A > Z" },
        { text: "Z > A", value: "Z > A" },
      ],
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "address",
      sorter: (a, b) => a.Address.localeCompare(b.Address),
      filters: [
        { text: "A > Z", value: "A > Z" },
        { text: "Z > A", value: "Z > A" },
      ],
    },
    {
      title: "Age",
      dataIndex: "Age",
      key: "age",
      sorter: (a, b) => a.Age - b.Age,
      filters: [
        { text: "Over 30", value: "over30" },
        { text: "Under 25", value: "under25" },
      ],
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "department",
      sorter: (a, b) => a.Department.localeCompare(b.Department),
      filters: [
        { text: "A > Z", value: "A > Z" },
        { text: "Z > A", value: "Z > A" },
      ],
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Flex gap="small" wrap className={classes.actions}>
          {isAdmin && (
            <Button
              type="primary"
              onClick={() => handleEdit(record)}
              className={classes.editButton}
            >
              Edit
            </Button>
          )}
          {isAdmin && (
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => dispatch(deleteUser(record.id))}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(record.id)}
                className={classes.deleteButton}
              >
                Delete
              </Button>
            </Popconfirm>
          )}
          <Button
            type="primary"
            onClick={() => handleDetail(record)}
            className={classes.detailButton}
          >
            Detail
          </Button>
        </Flex>
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
        first_name: value,
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
      {isAdmin && (
        <Button
          type="primary"
          onClick={onAddNewUser}
          className={classes.addUserButton}
          style={{ marginBottom: 16, marginTop: 16 }}
        >
          Add New User
        </Button>
      )}
      <Search
        placeholder="Enter user name to search"
        allowClear
        enterButton="Search"
        size="middle"
        style={{ width: 300, marginLeft: 800, marginBottom: 16, marginTop: 16 }}
        onSearch={onSearch}
      />
      <Select
        value={ageRange}
        onChange={onSearchAge}
        options={ageOptions}
        style={{ width: 200, marginBottom: 16, marginTop: 16, marginLeft: 16 }}
        placeholder="Age Range"
        allowClear
      />

      {isAdmin && (
        <UserModal
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
          selectedRecord={selectedRecord}
        />
      )}

      <Modal
        title="User Detail"
        visible={detailModalVisible}
        onOk={() => setDetailModalVisible(false)}
        onCancel={() => setDetailModalVisible(false)}
        maskClosable={false}
        style={{
          top: "30%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <span>Avatar: </span>
            <span
              style={{
                marginLeft: "50px",
              }}
            >
              <Image src={selectedRecord?.avatar} width={100} />
            </span>
          </div>

          <div>
            <span>First Name:</span>
            <span
              style={{
                marginLeft: "20px",
              }}
            >
              {selectedRecord?.first_name}
            </span>
          </div>
          <div>
            <span>Last Name:</span>
            <span
              style={{
                marginLeft: "20px",
              }}
            >
              {selectedRecord?.last_name}
            </span>
          </div>
          <div>
            <span>Address:</span>
            <span
              style={{
                marginLeft: "36px",
              }}
            >
              {selectedRecord?.Address}
            </span>
          </div>
          <div>
            <span>Age:</span>
            <span
              style={{
                marginLeft: "60px",
              }}
            >
              {selectedRecord?.Age}
            </span>
          </div>
          <div>
            <span>Department:</span>
            <span
              style={{
                marginLeft: "10px",
              }}
            >
              {selectedRecord?.Department}
            </span>
          </div>
        </div>
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

// import { Table, Button, Modal, Popconfirm, Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { Image } from "antd";
// import { useEffect, useState } from "react";
// import { getUserList, deleteUser, setUserDetail } from "../../store/UserList";
// import { Flex } from "antd";
// import { Input } from "antd";
// import classes from "../../../assets/styles/UserApp.module.scss";
// import UserModal from "./UserModal";
// import { Spin } from "antd";
// const { Search } = Input;

// const UserApp = () => {
//   const dispatch = useDispatch();
//   const { UserList, status } = useSelector((store) => store.UserAPI);
//   const [selectedRecord, setSelectedRecord] = useState({});
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [detailModalVisible, setDetailModalVisible] = useState(false);
//   const [ageRange, setAgeRange] = useState("");
//   const isAdmin = false;

//   useEffect(() => {
//     dispatch(getUserList());
//   }, [dispatch]);

//   const columns = [
//     {
//       title: "First Name",
//       dataIndex: "first_name",
//       key: "firstName",
//       sorter: (a, b) => a.first_name.localeCompare(b.first_name),
//       filters: [
//         { text: "A > Z", value: "A > Z" },
//         { text: "Z > A", value: "Z > A" },
//       ],
//     },
//     {
//       title: "Last Name",
//       dataIndex: "last_name",
//       key: "lastName",
//       sorter: (a, b) => a.last_name.localeCompare(b.last_name),
//       filters: [
//         { text: "A > Z", value: "A > Z" },
//         { text: "Z > A", value: "Z > A" },
//       ],
//     },
//     {
//       title: "Address",
//       dataIndex: "Address",
//       key: "address",
//       sorter: (a, b) => a.Address.localeCompare(b.Address),
//       filters: [
//         { text: "A > Z", value: "A > Z" },
//         { text: "Z > A", value: "Z > A" },
//       ],
//     },
//     {
//       title: "Age",
//       dataIndex: "Age",
//       key: "age",
//       sorter: (a, b) => a.Age - b.Age,
//       filters: [
//         { text: "Over 30", value: "over30" },
//         { text: "Under 25", value: "under25" },
//       ],
//     },
//     {
//       title: "Department",
//       dataIndex: "Department",
//       key: "department",
//       sorter: (a, b) => a.Department.localeCompare(b.Department),
//       filters: [
//         { text: "A > Z", value: "A > Z" },
//         { text: "Z > A", value: "Z > A" },
//       ],
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <Flex gap="small" wrap className={classes.actions}>
//           <Button
//             type="primary"
//             onClick={() => handleEdit(record)}
//             className={classes.editButton}
//           >
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure to delete this user?"
//             onConfirm={() => dispatch(deleteUser(record.id))}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button
//               type="primary"
//               danger
//               onClick={() => handleDelete(record.id)}
//               className={classes.deleteButton}
//             >
//               Delete
//             </Button>
//           </Popconfirm>
//           <Button
//             type="primary"
//             onClick={() => handleDetail(record)}
//             className={classes.detailButton}
//           >
//             Detail
//           </Button>
//         </Flex>
//       ),
//     },
//   ];

//   const handleEdit = (record) => {
//     setSelectedRecord(record);
//     setShowUserModal(true);
//   };

//   const handleDetail = (record) => {
//     dispatch(setUserDetail(record));
//     setSelectedRecord(record);
//     setDetailModalVisible(true);
//   };

//   const ageOptions = [
//     { value: "10-20", label: "Age 10 - 20" },
//     { value: "20-30", label: "Age 20 - 30" },
//     { value: "30-40", label: "Age 30 - 40" },
//     { value: "40+", label: "Age 40 up to" },
//   ];

//   const onSearch = (value) => {
//     dispatch(
//       getUserList({
//         first_name: value,
//       })
//     );
//   };

//   const onSearchAge = (value) => {
//     dispatch(
//       getUserList({
//         Age: value,
//       })
//     );
//   };

//   return (
//     <div className={classes.container}>
//       {status === "loading" && (
//         <div className={classes.loadingContainer}>
//           <Spin size="large" />
//         </div>
//       )}
//       <h1>User App</h1>
//       <Button
//         type="primary"
//         onClick={() => setShowUserModal(true)}
//         className={classes.addUserButton}
//         style={{ marginBottom: 16, marginTop: 16 }}
//       >
//         Add New User
//       </Button>
//       <Search
//         placeholder="Enter user name to search"
//         allowClear
//         enterButton="Search"
//         size="middle"
//         style={{ width: 300, marginLeft: 800, marginBottom: 16, marginTop: 16 }}
//         onSearch={onSearch}
//       />
//       <Select
//         value={ageRange}
//         onChange={(value) => setAgeRange(value)}
//         options={ageOptions}
//         style={{ width: 120, marginLeft: 16 }}
//         placeholder="Age Range"
//         allowClear
//         onSearch={onSearchAge}
//       />

//       <UserModal
//         showUserModal={showUserModal}
//         setShowUserModal={setShowUserModal}
//         selectedRecord={selectedRecord}
//       />

//       <Modal
//         title="User Detail"
//         visible={detailModalVisible}
//         onOk={() => setDetailModalVisible(false)}
//         onCancel={() => setDetailModalVisible(false)}
//         maskClosable={false}
//         style={{
//           top: "30%",
//         }}
//       >
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <div>
//             <span>Avatar: </span>
//             <span
//               style={{
//                 marginLeft: "50px",
//               }}
//             >
//               <Image src={selectedRecord?.avatar} width={100} />
//             </span>
//           </div>

//           <div>
//             <span>First Name:</span>
//             <span
//               style={{
//                 marginLeft: "20px",
//               }}
//             >
//               {selectedRecord?.first_name}
//             </span>
//           </div>
//           <div>
//             <span>Last Name:</span>
//             <span
//               style={{
//                 marginLeft: "20px",
//               }}
//             >
//               {selectedRecord?.last_name}
//             </span>
//           </div>
//           <div>
//             <span>Address:</span>
//             <span
//               style={{
//                 marginLeft: "36px",
//               }}
//             >
//               {selectedRecord?.Address}
//             </span>
//           </div>
//           <div>
//             <span>Age:</span>
//             <span
//               style={{
//                 marginLeft: "60px",
//               }}
//             >
//               {selectedRecord?.Age}
//             </span>
//           </div>
//           <div>
//             <span>Department:</span>
//             <span
//               style={{
//                 marginLeft: "10px",
//               }}
//             >
//               {selectedRecord?.Department}
//             </span>
//           </div>
//         </div>
//       </Modal>
//       <Table
//         columns={columns}
//         dataSource={UserList}
//         className={classes.table}
//       />
//     </div>
//   );
// };

// export default UserApp;
