import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
// import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (e) => {
    console.log(form);
    e.preventDefault();
    try {
      const response = await api.post("/user/sign-in", form);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/permuta");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // setOpen(false);
    console.log(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

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
        footer={
          [
            // <Button key="back" onClick={handleCancel}>
            //   Voltar
            // </Button>,
            // <Button key="submit" type="primary" onClick={handleOk}>
            //   Entrar
            // </Button>,
          ]
        }
      >
        <Form
          initialValues={{ remember: false }}
          autoComplete="off"
          // onSubmit={handleSubmit}
        >
          <Form.Item
            label="E-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
            rules={[
              {
                message: "Por favor, insira seu e-mail.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            value={form.password}
            onChange={handleChange}
            rules={[
              {
                message: "Por favor, insira sua senha.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <p>
              Não tem uma conta?<Button type="link">Crie uma!</Button>
            </p>
          </Form.Item>
          <Button key="back" onClick={handleCancel}>
            Voltar
          </Button>
          <Button key="submit" type="primary" onClick={handleOk}>
            Entrar
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
export default Login;
