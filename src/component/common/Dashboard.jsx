import React from "react";
import { Typography, Card, Avatar, Image, Row, Col } from "antd";
import avatarlogo from "../../assets/avatar.jpg";
import classes from "../../assets/styles/Dashboard.module.scss";
import logovmu from "../../assets/vmu.jpg";

const { Title, Text } = Typography;

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Dashboard</Title>
      <Title level={3}>Welcome to my portfolio</Title>
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRucPPApjlpZAjn92l2StcZmZ-povNWCrE8pA&s"
        style={{ marginLeft: "500%", width: "50%", marginTop: "-50%" }}
      />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card className={classes.card}>
            <div style={{ textAlign: "center" }}>
              <Avatar size={200} src={<Image src={avatarlogo} />} />
              <Title level={3}>Minh Quang</Title>
              <Text>FrontEnd Dev Lỏd</Text>
            </div>
          </Card>
        </Col>
        <Col span={16} style={{ padding: "20px" }}>
          <Card style={{ marginBottom: "20px" }} className={classes.card}>
            <Title level={2}>About Me</Title>
            <Text>
              I am a passionate software engineer with experience in building
              web applications using React, Node.js. I am always eager to learn
              new technologies and improve my skills.
            </Text>
          </Card>
          <Card style={{ marginBottom: "20px" }} className={classes.card}>
            <Title level={2}>Experience</Title>
            <div>
              <Title level={4}>Software Engineer</Title>
              <Text>VTI ACADEMY - 2024 - Present</Text>
              <ul>
                <li>
                  Developed and maintained web applications using React, Node.js
                </li>
                <li>
                  Worked closely with the team to design and implement new
                  features
                </li>
                <li>
                  Participated in code reviews and provided feedback to other
                  team members
                </li>
              </ul>
            </div>
          </Card >
          <Card style={{ marginBottom: "20px" }} className={classes.card}>
            <Title level={2}>Education</Title>
            <div>
              <Title level={4}>Newbie Lỏd of Science in Computer Science</Title>
              <Text>VietName Maritime University - 2022</Text>
              <br />
              <Text>Networking and Security</Text>
              <br />
              <Text>Faculty of Information Technology</Text>
              <Image src={logovmu} className={classes.vmu} />
            </div>
          </Card>
          <Card style={{ marginBottom: "20px" }} className={classes.card}>
            <Title level={2}>Skills</Title>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#E6E6FA",
                  }}
                >
                  <Typography>React</Typography>
                  <img
                    src="https://img.icons8.com/color/48/000000/react-native.png"
                    style={{ width: "50px", height: "50px", marginLeft: "25%" }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#E6E6FA",
                  }}
                >
                  <Typography>Node.js</Typography>
                  <img
                    src="https://img.icons8.com/color/48/000000/nodejs.png"
                    style={{ width: "50px", height: "50px", marginLeft: "25%" }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#E6E6FA",
                  }}
                >
                  <Typography>JavaScript</Typography>
                  <img
                    src="https://img.icons8.com/color/48/000000/javascript.png"
                    style={{ width: "50px", height: "50px", marginLeft: "25%" }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#E6E6FA",
                  }}
                >
                  <Typography>Git</Typography>
                  <img
                    src="https://img.icons8.com/color/48/000000/git.png"
                    style={{ width: "50px", height: "50px", marginLeft: "25%" }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#E6E6FA",
                  }}
                >
                  <Typography>HTML/CSS</Typography>
                  <img
                    src="https://img.icons8.com/color/48/000000/html-5.png"
                    style={{ width: "50px", height: "50px", marginLeft: "25%" }}
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/css3.png"
                    style={{ width: "50px", height: "50px", marginLeft: "25%" }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{
                    backgroundColor: "#E6E6FA",
                  }}
                >
                  <Typography>Redux</Typography>
                  <img
                    src="https://img.icons8.com/color/48/000000/redux.png"
                    style={{ width: "50px", height: "50px", marginLeft: "25%" }}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
