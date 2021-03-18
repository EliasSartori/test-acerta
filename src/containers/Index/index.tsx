import React, { useState, useEffect } from "react";
import {
  Table,
  Image,
  Row,
  Layout,
  Typography,
  Col,
  Button,
  Tooltip,
  Popconfirm,
  Divider,
} from "antd";
import { Formik, Field, Form } from "formik";
import logo from "../../logo.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

const { Content } = Layout;
const { Text } = Typography;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: "E-Mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "CPF",
    dataIndex: "cpf",
    key: "cpf",
  },
  {
    title: "Estado Civil",
    dataIndex: "estadoCivil",
    key: "estadoCivil",
  },
  {
    title: "Nome Cônjuge",
    dataIndex: "nomeConjugue",
    key: "nomeConjugue",
  },
];

const Index = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://my-json-server.typicode.com/EliasSartori/test-acerta-api-fake/leads`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

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
          Consulta de Leads
        </Text>
      </Row>
      <Row
        style={{
          backgroundColor: "white",
          marginBottom: "1%",
          padding: 25,
          borderRadius: 15,
          height: 200,
        }}
      >
        <Formik
          initialValues={{ name: "", email: "" }}
          onSubmit={(values) => {
            setName(values.name);
            setEmail(values.email);
          }}
        >
          <Form>
            <Row
              style={{
                marginBottom: 30,
              }}
            >
              <Text style={{ color: "#020202", fontSize: 24 }}>Filtros</Text>
            </Row>
            <Row
              justify="center"
              align="middle"
              style={{
                position: "absolute",
                width: "70%",
              }}
            >
              <Col span={10}>
                <Field
                  placeholder="Nome"
                  style={{
                    width: "80%",
                    padding: 10,
                    marginLeft: 8,
                    borderRadius: 4,
                    borderColor: "#ebebeb",
                    borderWidth: 0.2,
                  }}
                  name="name"
                  type="text"
                />
              </Col>
              <Col span={10}>
                <Field
                  placeholder="E-Mail"
                  style={{
                    width: "80%",
                    padding: 10,
                    marginLeft: 8,
                    borderRadius: 4,
                    borderColor: "#ebebeb",
                    borderWidth: 0.2,
                  }}
                  name="email"
                  type="text"
                />
              </Col>
              <Col span={4}>
                <button
                  style={{
                    height: 40,
                    width: 120,
                    borderRadius: 5,
                    backgroundColor: "#F79028",
                    borderColor: "transparent",
                  }}
                >
                  <b>Filtrar</b>
                </button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </Row>
      <Row style={{ marginBottom: "1%" }}>
        <Link to="/new">
          <Button
            type="text"
            style={{
              height: 40,
              width: 120,
              borderRadius: 5,
              backgroundColor: "#F79028",
              borderColor: "transparent",
            }}
          >
            <b>Cadastrar</b>
          </Button>
        </Link>
      </Row>
      <Table
        pagination={false}
        rowKey="id"
        size="small"
        dataSource={data.filter(
          (lead: any) =>
            _.get(lead, "nome", "")
              .toLowerCase()
              .includes(name.toLowerCase()) &&
            _.get(lead, "email", "").toLowerCase().includes(email.toLowerCase())
        )}
        columns={[
          ...columns,
          {
            width: "10%",
            key: "acoes",
            dataIndex: "",
            render: (record: any) => (
              <>
                <Tooltip placement="top" title="Editar">
                  <Link to={`/edit/${_.get(record, "id", 0)}`}>
                    <AiFillEdit />
                  </Link>
                </Tooltip>
                <Divider type="vertical" />
                <Popconfirm
                  title="Tem certeza que deseja deletar esse registro?"
                  onConfirm={() =>
                    axios
                      .delete(
                        `https://my-json-server.typicode.com/EliasSartori/test-acerta-api-fake/leads/${_.get(
                          record,
                          "id",
                          0
                        )}`
                      )
                      .then((res) => {
                        if (res.statusText === "OK") {
                          axios
                            .get(
                              `https://my-json-server.typicode.com/EliasSartori/test-acerta-api-fake/leads`
                            )
                            .then((res) => {
                              setData(res.data);
                            });
                        }
                      })
                  }
                  okText="Sim"
                  cancelText="Não"
                  placement="bottom"
                >
                  <Tooltip placement="top" title="Excluir">
                    <Link to=":;">
                      <AiTwotoneDelete />
                    </Link>
                  </Tooltip>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />
    </Content>
  );
};

export default Index;
