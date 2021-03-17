import React, { useState, useEffect } from "react";
import { Image, Row, Layout, Typography, Spin } from "antd";
import logo from "../../logo.svg";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import FormShared from "../FormShared";
import _ from "lodash";

const { Content } = Layout;
const { Text } = Typography;

const Edit = () => {
  const { id } = useParams<any>();
  const history = useHistory();
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/leads/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  if (_.isEmpty(data)) {
    return <Spin />;
  }

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
          defaultValues={data}
          onSubmit={(values: any) => {
            axios
              .put(`http://localhost:3001/leads/${id}`, values)
              .then((res) => {
                if (res.statusText === "OK") {
                  history.push("/");
                }
              });
          }}
        />
      </Row>
    </Content>
  );
};

export default Edit;
