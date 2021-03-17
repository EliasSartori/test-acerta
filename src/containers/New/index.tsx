import React from "react";
import { Image, Row, Layout, Typography } from "antd";
import logo from "../../logo.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FormShared from "../FormShared";

const { Content } = Layout;
const { Text } = Typography;

const New = () => {
  const history = useHistory();

  return (
    <Content
      style={{
        backgroundColor: "#224D74",
        height: window.innerHeight,
        width: window.innerWidth,
        paddingLeft: "15%",
        paddingRight: "15%",
      }}
    >
      <Row>
        <Image height={100} width={200} preview={false} src={logo} />
      </Row>
      <Row>
        <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: "bold" }}>
          Cadastro de Leads
        </Text>
      </Row>
      <Row
        style={{
          backgroundColor: "white",
          marginBottom: "1%",
          padding: 25,
          borderRadius: 15,
          height: 450,
          position: "absolute",
          width: "70%",
        }}
      >
        <FormShared
          onSubmit={(values: any) => {
            axios.post(`http://localhost:3001/leads`, values).then((res) => {
              if (res.statusText === "Created") {
                history.push("/");
              }
            });
          }}
        />
      </Row>
    </Content>
  );
};

export default New;
