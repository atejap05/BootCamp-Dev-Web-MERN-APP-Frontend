import React, {useEffect, useState} from "react";
import {Alert, Button, Divider, Form, Input, message} from "antd";
import {EditOutlined} from "@ant-design/icons";
import api from "../../api/api.js";
import AntdSelect from "../../components/UI/AntSelect";
import classes from "../../css/styles.module.css";
import noImage from "../../assets/imgs/no_image.jpg";

const UserProfile = () => {


    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const [orgaoList, setOrgaoList] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [selectedOrgaoId, setSelectedOrgaoId] = useState(loggedInUser['user']['orgaoId']['_id']);
    const [selectedUnidadeId, setSelectedUnidadeId] = useState(loggedInUser['user']['unidadeId']['_id']);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        api
            .get("/orgao")
            .then(res => {
                setOrgaoList(
                    res.data.map(o => {
                        return {value: o._id, label: o.name};
                    })
                );
            })
            .catch(err => console.error(err));

        getUnidades(loggedInUser['user']['orgaoId']['_id'])

    }, []);

    const getUnidades = (orgaoId) => {

        api
            .get(`/unidade/byOrgao?orgaoId=${orgaoId}`)
            .then(res => {
                setUnidades(
                    res.data.map(u => {
                        return {value: u._id, label: u["name"]};
                    })
                );
            })
            .catch(e => console.error(e));
    }

    const onFinish = async values => {
        const {password, newPassword, confirmNewPassword} = values;

        console.log(newPassword, confirmNewPassword)

        if (newPassword !== confirmNewPassword) {
            setErrorMsg("As senhas informadas não são idênticas.");
            setShowAlert(true);
            return;
        }

        if (selectedOrgaoId.length === 0) {
            setErrorMsg("Por favor, selecione seu órgão de origem.");
            setShowAlert(true);
            return;
        }

        if (selectedUnidadeId.length === 0) {
            setErrorMsg("Por favor, selecione sua unidade de origem.");
            setShowAlert(true);
            return;
        }

        try {
            const matchPassword = await api.get(`/user/verify-password?id=${loggedInUser['user']['_id']}&password=${password}`)
            if (!matchPassword.data) {
                setShowAlert(true)
                setErrorMsg("A senha informada não confere")
                return
            }
        } catch (e) {
            console.log(e)
            setShowAlert(true)
            setErrorMsg(e.message)
        }

        const user = await api.put("/user/update-user", {
            _id: loggedInUser['user']['_id'],
            password: newPassword,
            orgaoId: selectedOrgaoId,
            unidadeId: selectedUnidadeId,
        });

        if (user.status === 201) {
          messageApi
            .open({
              type: "success",
              content:
                "Dados alterados com sucesso!",
            })
            .then();
        }
    };
    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className={classes["profile"]}>
            {contextHolder}
            <section className={classes["profile__header"]}>
                <div className={classes["profile__header--img"]}>
                    <img src={noImage} alt="User Profile Pic"/>
                    <span onClick={() => console.log("Open Modal Choose Pic")}>
            <EditOutlined/>
          </span>
                </div>
                <div className={classes["profile__header--info"]}>
                    <p>{loggedInUser['user']['name']}</p>
                    <p>{String(loggedInUser['user']['cpf']).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
                    <p>{loggedInUser['user']['email']}</p>
                </div>
            </section>
            <Divider/>
            <Form
                name="basic"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Órgão" name="orgao" rules={[{required: false}]}>
                    <AntdSelect
                        placeholder="Selecione seu órgão."
                        optionsArray={orgaoList}
                        defaultValue={loggedInUser['user']['orgaoId']['name']}
                        onSelectChange={value => {
                            setSelectedOrgaoId(value.value);
                            getUnidades(value.value)
                        }}
                    />
                </Form.Item>

                <Form.Item label="Unidade" name="unidade" rules={[{required: false}]}>
                    <AntdSelect
                        placeholder="Selecione sua unidade."
                        optionsArray={unidades}
                        onSelectChange={value => setSelectedUnidadeId(value.value)}
                        defaultValue={loggedInUser['user']['unidadeId']['name']}
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
                    label="Nova Senha"
                    name="newPassword"
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="Confirme Nova Senha"
                    name="confirmNewPassword"
                >
                    <Input.Password/>
                </Form.Item>
                <Button key="submit" type="primary" htmlType="submit">
                    Salvar Alterações
                </Button>
                {showAlert && (
                    <Alert
                        message={errorMsg}
                        type="error"
                        closable
                        onClose={() => setShowAlert(prev => !prev)}
                    />
                )}
            </Form>
        </div>
    );
};

export default UserProfile;
