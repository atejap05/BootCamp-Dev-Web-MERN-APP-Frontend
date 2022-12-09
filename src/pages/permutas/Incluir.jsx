import React from "react";
import { Button, Form, Input } from "antd";
import classes from "../../css/styles.module.css";

const Incluir = () => {
  const onFinish = values => {
    console.log("Success:", values);
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <section className={classes["incluir"]}>
      <div className={classes["incluir__title"]}>
        <h1>Intenções de Permuta</h1>
        <p>
          Nome: <span>Joel Alves Pereira</span>
        </p>
      </div>
      <div className={classes["incluir__origem"]}>
        <h3>Dados de Origem</h3>
        <div>
          <p>
            UF: <span>MT</span>
          </p>
          <p>
            Unidade: <span>DRF-Cuiabá</span>
          </p>
        </div>
      </div>

      <Form
        className={classes["incluir__form"]}
        layout="inline"
        name="incluir"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="UF:"
          name="uf"
          rules={[
            {
              required: true,
              message: "Please input your UF!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Destino:"
          name="Destino"
          rules={[
            {
              required: true,
              message: "Please input your destiny!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Incluir
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Incluir;
