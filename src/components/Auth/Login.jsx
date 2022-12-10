import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import SignUp from "./SignUp";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
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

  const handleRegister = () => {
    setOpen(false);
    return <SignUp />
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Entrar
      </Button>
      <Modal
        open={open}
        title="Autenticação do usuário"
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
            label="E-mail"
            name="username"
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

          <Form.Item>
            <p>
              Não tem uma conta?<Button type="link" onClick={handleRegister}>Crie uma!</Button>
            </p>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Login;
