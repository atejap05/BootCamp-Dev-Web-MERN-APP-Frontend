import React, {useRef, useState} from "react";
import {Alert, Button, Form, Input, Modal, Space} from "antd";
import {useNavigate} from "react-router-dom";
import api from "../../api/api.js";


const Login = ({setShowSignUp}) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const formRef = useRef()

    const toggleModal = () => {
        formRef.current?.resetFields()
        setShowAlert(false)
        setOpen(prev => !prev);
    };

    const onFinish = async ({email, password}) => {

        if (!email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g)) {
            setLoginErrorMsg("Por favor, insira um e-mail válido!")
            setShowAlert(true)
            return
        }

        if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/)) {
            setLoginErrorMsg("A senha deve conter maiúscula, minúscula, número e caracter especial ($*&@#!).")
            setShowAlert(true)
            return
        }



        try {
            const response = await api.post("/user/sign-in", {email, password});

            const orgao = await api.get(`/orgao/${response.data['user']['orgaoId']}`)
            const unidade = await api.get(`/unidade/${response.data['user']['unidadeId']}`)

            response.data['user'].orgaoName = orgao.data.name
            response.data['user'].orgaoSigla = orgao.data['sigla']

            response.data['user'].unidadeName = unidade.data.name
            response.data['user'].unidadeSigla = unidade.data['sigla']
            response.data['user'].unidadeState = unidade.data['state']
            response.data['user'].unidadeCity = unidade.data['city']

            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            navigate("/permuta");
        } catch (error) {

            console.log(error.response);

            setShowAlert(true)
            setLoginErrorMsg(error.response['data']['msg'])
        }
        // toggleModal()
    };

    return (
        <div>
            <Button type="primary" onClick={toggleModal}>
                Entrar
            </Button>
            <Modal
                open={open}
                title="Autenticação do usuário"
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Form
                    initialValues={{remember: false}}
                    onFinish={onFinish}
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
                        <Input/>
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
                        <Input.Password/>
                    </Form.Item>

                    {showAlert && <Alert
                        message={loginErrorMsg}
                        type="error"
                        closable
                        onClose={() => setShowAlert(prev => !prev)}
                    />}

                    <Form.Item>
                        <p>
                            Não possui uma conta? <Button type="link" onClick={() => {
                            toggleModal()
                            setShowSignUp(prev => !prev)
                        }}>Crie uma!</Button>
                        </p>
                    </Form.Item>
                    <Space>
                        <Button key="back" onClick={toggleModal}>Voltar</Button>
                        <Button key="submit" type="primary" htmlType="submit">Entrar</Button>
                    </Space>
                </Form>
            </Modal>
        </div>
    );
};
export default Login;
