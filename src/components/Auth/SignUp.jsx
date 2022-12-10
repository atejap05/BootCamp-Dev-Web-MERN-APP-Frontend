import React, { useState } from "react";
import { Button, Modal, Form, Input, Switch, Select } from "antd";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    orgao: "",
    unidade: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={showModal}>
        Cadastrar
      </Button>
      <Modal
        open={open}
        title="Cadastro de usuário"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Voltar
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Entrar
          </Button>,
        ]}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu nome.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu CPF.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, insira seu e-mail.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
          label="Órgão"
          name="unit"
          rules={[
              {
                required: true
              },
            ]}
            >
            <Select placeholder="Selecione seu órgão">
              <Select.Option value="RFB">Receita Federal</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
          label="Unidade"
          name="unit"
          rules={[
              {
                required: true
              },
            ]}
          >
            <Select placeholder="Selecione sua unidade">
              <Select.Option value="DRF-Santarém">Delegacia da Receita Federal do Brasil em Santarém</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, insira sua senha.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirma senha"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Por favor, confirme sua senha.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Administrador" valuePropName="isAdmin">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SignUp;
