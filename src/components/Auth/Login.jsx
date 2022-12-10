import React, { useState } from "react";
import { Button, Modal, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.js";

const Login = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({email: "", password: ""});
  const [showAlert, setShowAlert] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  const showModal = () => {setOpen(true);};

  const handleOk = async (e) => {

    e.preventDefault();

    if (!form.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)){
      setShowAlert(true)
      setLoginErrorMsg("Por favor, insira um e-mail válido!")
      return
    }

    if(!form.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/)){
      setShowAlert(true)
      setLoginErrorMsg("Senha informada não atende os critério de validade!")
      return
    }

    try {

      const response = await api.post("/user/sign-in", form);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/permuta");

    } catch (error) {

      console.log(error.response);

      setShowAlert(true)
      setLoginErrorMsg('E-mail ou senha incorretos')
    }
  };

  const handleCancel = () => {
    setOpen(false);
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
        footer={null}
      >
        <Form
          initialValues={{ remember: false }}
          autoComplete="off"
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

          {showAlert && <Alert
              message={loginErrorMsg}
              type="error"
              closable
              onClose={() => setShowAlert(prev => !prev)}
          />}

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
