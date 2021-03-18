import React, { useState, useEffect } from "react";
import { Row, Typography, Col, Button } from "antd";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import _ from "lodash";

const { Text } = Typography;

type PropTypes = {
  defaultValues?: {};
  onSubmit: any;
};

const FormSchema = Yup.object().shape({
  nome: Yup.string().required("Obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Obrigatório"),
  estadoCivil: Yup.string().required("Obrigatório"),
  cpf: Yup.string().required("Obrigatório"),
});

const FormShared = ({ onSubmit, defaultValues }: PropTypes) => {
  const [dataSelect, setDataSelect] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://my-json-server.typicode.com/EliasSartori/test-acerta-api-fake/tiposEstadoCivil`
      )
      .then((res) => {
        setDataSelect(res.data);
      });
  }, []);

  return (
    <Formik
      initialValues={{
        nome: _.get(defaultValues, "nome", ""),
        email: _.get(defaultValues, "email", ""),
        cpf: _.get(defaultValues, "cpf", ""),
        estadoCivil: _.get(defaultValues, "estadoCivil", ""),
        nomeConjugue: _.get(defaultValues, "nomeConjugue", ""),
      }}
      validationSchema={FormSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values }) => {
        const validateNomeConjugue = (value: string) => {
          if (!(values.estadoCivil === "Casado(a)")) {
            return null;
          }
          if (_.isEmpty(value)) {
            return "Obrigatório";
          }
          return null;
        };

        return (
          <Form
            style={{
              marginTop: "3%",
              width: "100%",
            }}
          >
            <Row
              style={{
                marginBottom: "3%",
              }}
            >
              <Col span={12}>
                <Field
                  placeholder="Nome"
                  style={{
                    width: "85%",
                    padding: 10,
                    marginLeft: 8,
                    borderRadius: 4,
                    borderColor: "#ebebeb",
                    borderWidth: 0.2,
                  }}
                  name="nome"
                  type="text"
                />
                {errors.nome && touched.nome ? (
                  <Row style={{ marginLeft: 10, marginTop: 5 }}>
                    <Text style={{ color: "red" }}>{errors.nome}</Text>
                  </Row>
                ) : null}
              </Col>
              <Col span={12}>
                <Field
                  placeholder="CPF"
                  style={{
                    width: "85%",
                    padding: 10,
                    marginLeft: 8,
                    borderRadius: 4,
                    borderColor: "#ebebeb",
                    borderWidth: 0.2,
                  }}
                  name="cpf"
                  type="text"
                />
                {errors.cpf && touched.cpf ? (
                  <Row style={{ marginLeft: 10, marginTop: 5 }}>
                    <Text style={{ color: "red" }}>{errors.cpf}</Text>
                  </Row>
                ) : null}
              </Col>
            </Row>
            <Row
              style={{
                marginBottom: "3%",
              }}
            >
              <Col span={12}>
                <Field
                  placeholder="E-Mail"
                  style={{
                    width: "85%",
                    padding: 10,
                    marginLeft: 8,
                    borderRadius: 4,
                    borderColor: "#ebebeb",
                    borderWidth: 0.2,
                  }}
                  name="email"
                  type="text"
                />
                {errors.email && touched.email ? (
                  <Row style={{ marginLeft: 10, marginTop: 5 }}>
                    <Text style={{ color: "red" }}>{errors.email}</Text>
                  </Row>
                ) : null}
              </Col>
              <Col span={12}>
                <Field
                  as="select"
                  style={{
                    width: "85%",
                    padding: 10,
                    marginLeft: 8,
                    borderRadius: 4,
                    borderWidth: 0.2,
                  }}
                  name="estadoCivil"
                  type="text"
                >
                  {!values.estadoCivil && <option>Selecione</option>}
                  {dataSelect.map((item: any) => (
                    <option value={item.nomeEstadoCivil}>
                      {item.nomeEstadoCivil}
                    </option>
                  ))}
                </Field>
                {errors.estadoCivil && touched.estadoCivil ? (
                  <Row style={{ marginLeft: 10, marginTop: 5 }}>
                    <Text style={{ color: "red" }}>{errors.estadoCivil}</Text>
                  </Row>
                ) : null}
              </Col>
            </Row>
            <Row
              style={{
                marginBottom: "3%",
              }}
            >
              <Col span={12}>
                <Field
                  validate={validateNomeConjugue}
                  value={
                    values.estadoCivil === "Casado(a)"
                      ? values.nomeConjugue
                      : ""
                  }
                  disabled={!(values.estadoCivil === "Casado(a)")}
                  placeholder={
                    values.estadoCivil === "Casado(a)" ? "Nome Conjuge" : ""
                  }
                  style={{
                    width: "85%",
                    padding: 10,
                    marginLeft: 8,
                    borderRadius: 4,
                    borderColor: "#ebebeb",
                    borderWidth: 0.2,
                  }}
                  name="nomeConjugue"
                  type="text"
                />
                {errors.nomeConjugue && touched.nomeConjugue ? (
                  <Row style={{ marginLeft: 10, marginTop: 5 }}>
                    <Text style={{ color: "red" }}>{errors.nomeConjugue}</Text>
                  </Row>
                ) : null}
              </Col>
            </Row>
            <Row
              style={{
                marginBottom: "3%",
              }}
            >
              <Col span={12}>
                <Link to="/">
                  <Button
                    type="text"
                    style={{
                      height: 40,
                      width: 120,
                      borderRadius: 5,
                      backgroundColor: "#989898",
                      borderColor: "transparent",
                    }}
                  >
                    <b>Cancelar</b>
                  </Button>
                </Link>
              </Col>
              <Col span={12}>
                <button
                  style={{
                    height: 40,
                    width: 120,
                    borderRadius: 5,
                    backgroundColor: "#F79028",
                    borderColor: "transparent",
                  }}
                >
                  <b>Cadastrar</b>
                </button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormShared;
