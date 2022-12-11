import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Input, Modal} from "antd";
import api from "../../api/api.js";
import AntdSelect from "../UI/AntSelect";

const SignUp = ({messageApi, showSignUp}) => {

    const [open, setOpen] = useState(false);
    const [orgaoList, setOrgaoList] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [selectedOrgaoId, setSelectedOrgaoId] = useState("");
    const [selectedUnidadeId, setSelectedUnidadeId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    useEffect(() => {

        api.get('/orgao')
            .then(res => {
                setOrgaoList(res.data.map(o => {
                    return {value: o._id, label: o.name}
                }))
            }).catch(err => console.error(err))
    }, [])

    useEffect(() => {
        toggleModal()

    }, [showSignUp])

    const onFinish = async (values) => {

        const {name, cpf, email, password, confirmPassword} = values

        if (password !== confirmPassword) {
            setLoginErrorMsg("As senhas informadas não são idênticas.")
            setShowAlert(true)
            return
        }

        if (selectedOrgaoId.length === 0) {
            setLoginErrorMsg("Por favor, selecione seu órgão de origem.")
            setShowAlert(true)
            return
        }

        if (selectedUnidadeId.length === 0) {
            setLoginErrorMsg("Por favor, selecione sua unidade de origem.")
            setShowAlert(true)
            return
        }

        const user = await api.post('/user/sign-up', {
            name, cpf, email, password, orgaoId: selectedOrgaoId, unidadeId: selectedUnidadeId
        })

        if (user.status === 201) {

            toggleModal()

            messageApi.open({
                type: 'success',
                content: 'Cadastro realizado com sucesso! Para acessar o sistema, efetue o login.',
            }).then()

        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const toggleModal = () => {
        setOpen(prev => !prev);
    };

    return (
        <div>
            <Button onClick={toggleModal}>Cadastrar</Button>
            <Modal
                open={open}
                title="Cadastro de usuário"
                onCancel={toggleModal}
                footer={null}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Nome"
                        name="name"
                        rules={[{required: true, message: "Por favor, insira seu nome."}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="CPF"
                        name="cpf"
                        rules={[{required: true, message: "Por favor, insira seu CPF."}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[{required: true, message: "Por favor, insira seu e-mail."}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Órgão"
                        name="orgao"
                        rules={[{required: false}]}
                    >
                        <AntdSelect placeholder="Selecione seu órgão."
                                    optionsArray={orgaoList}
                                    onSelectChange={value => {
                                        setSelectedOrgaoId(value.value)
                                        api.get(`/unidade/byOrgao?orgaoId=${value.value}`)
                                            .then(res => {
                                                setUnidades(res.data.map(u => {
                                                    return {value: u._id, label: u['name']}
                                                }))
                                            }).catch(e => console.error(e))
                                    }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Unidade"
                        name="unidade"
                        rules={[{required: false}]}
                    >
                        <AntdSelect placeholder="Selecione sua unidade."
                                    optionsArray={unidades}
                                    onSelectChange={value => setSelectedUnidadeId(value.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[{required: true, message: "Por favor, insira sua senha."}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="Confirme senha"
                        name="confirmPassword"
                        rules={[{required: true, message: "Por favor, confirme sua senha."}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Button key="submit" type="primary" htmlType="submit">Cadastrar</Button>
                    {showAlert && <Alert
                        message={loginErrorMsg}
                        type="error"
                        closable
                        onClose={() => setShowAlert(prev => !prev)}
                    />}

                </Form>
            </Modal>
        </div>
    );
};

export default SignUp;
