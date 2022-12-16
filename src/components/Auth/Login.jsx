import React, { useRef, useState } from "react";
import { Alert, Button, Form, Input, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import classes from "../../css/styles.module.css";
import api from "../../api/api.js";

const Login = ({ setShowSignUp }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("Autenticação do usuário");

  const [btnOkText, setBtnOkText] = useState("Entrar");
  const [showSignupLink, setShowSignupLink] = useState(true);
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [showforgotPasswordLink, setShowforgotPasswordLink] = useState(true);
  const [tipo, setTipo] = useState("login");

  const formRef = useRef();

  const toggleModal = () => {
    formRef.current?.resetFields();
    setShowAlert(false);
    setOpen(prev => !prev);

    setShowSignupLink(true);
    setShowPasswordField(true);
    setShowforgotPasswordLink(true);
    setBtnOkText("Entrar");
    setModalTitle("Autenticação do usuário");
    setTipo("login");
  };

  const onFinish = async (tipo, { email, password }) => {

    if (tipo === "login") {
      try {
        const response = await api.post("/user/sign-in", { email, password });
        localStorage.setItem("loggedInUser", JSON.stringify(response.data));

        navigate("/permuta");
      } catch (error) {
        console.log(error.response);

        setShowAlert(true);
        setLoginErrorMsg(error.response["data"]["msg"]);
      }
    } else {

      try {
        const response = await api.get(`/user/new-password?email=${email}`);
        toggleModal()
      } catch (error) {
        console.log(error.response);

        setShowAlert(true);
        setLoginErrorMsg(error.response["data"]["msg"]);
      }


    }
  };

  return (
    <div>
      <Button type="primary" onClick={toggleModal}>
        Entrar
      </Button>
      <Modal
        open={open}
        title={modalTitle}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          className={classes["login"]}
          initialValues={{ remember: false }}
          onFinish={values => onFinish(tipo, values)}
          ref={formRef}
        >
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

          {showPasswordField && (
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
          )}

          {showAlert && (
            <Alert
              message={loginErrorMsg}
              type="error"
              closable
              onClose={() => setShowAlert(prev => !prev)}
            />
          )}

          {showSignupLink && (
            <Form.Item>
              <p>
                Não possui uma conta?{" "}
                <Button
                  type="link"
                  onClick={() => {
                    toggleModal();
                    setShowSignUp(prev => !prev);
                  }}
                >
                  Crie uma!
                </Button>
              </p>
            </Form.Item>
          )}
          {showforgotPasswordLink && (
            <Form.Item>
              <div>
                Esqueceu a sua senha?{" "}
                <Button
                  type="link"
                  onClick={() => {
                    setBtnOkText("Confirmar");
                    setShowSignupLink(false);
                    setModalTitle("Recuperação de senha");
                    setShowPasswordField(false);
                    setShowforgotPasswordLink(false);
                    setTipo("pass");
                  }}
                >
                  Clique aqui!
                </Button>
              </div>
            </Form.Item>
          )}
          <Space>
            <Button key="back" onClick={toggleModal}>
              Voltar
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              {btnOkText}
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};
export default Login;
