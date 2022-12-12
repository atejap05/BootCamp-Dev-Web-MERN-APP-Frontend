import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Divider, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import api from "../../api/api.js";
import AntdSelect from "../../components/UI/AntSelect";
import classes from "../../css/styles.module.css";
import noImage from "../../assets/imgs/no_image.jpg";

const UserProfile = ({ messageApi }) => {
  const [orgaoList, setOrgaoList] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [selectedOrgaoId, setSelectedOrgaoId] = useState("");
  const [selectedUnidadeId, setSelectedUnidadeId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const formRef = useRef();

  useEffect(() => {
    api
      .get("/orgao")
      .then(res => {
        setOrgaoList(
          res.data.map(o => {
            return { value: o._id, label: o.name };
          })
        );
      })
      .catch(err => console.error(err));
  }, []);

  const onFinish = async values => {
    const { name, cpf, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setLoginErrorMsg("As senhas informadas não são idênticas.");
      setShowAlert(true);
      return;
    }

    if (selectedOrgaoId.length === 0) {
      setLoginErrorMsg("Por favor, selecione seu órgão de origem.");
      setShowAlert(true);
      return;
    }

    if (selectedUnidadeId.length === 0) {
      setLoginErrorMsg("Por favor, selecione sua unidade de origem.");
      setShowAlert(true);
      return;
    }

    const user = await api.post("/user/sign-up", {
      name,
      cpf,
      email,
      password,
      orgaoId: selectedOrgaoId,
      unidadeId: selectedUnidadeId,
    });

    if (user.status === 201) {
      messageApi
        .open({
          type: "success",
          content:
            "Cadastro realizado com sucesso! Para acessar o sistema, efetue o login.",
        })
        .then();
    }
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes["profile"]}>
      <section className={classes["profile__header"]}>
        <div className={classes["profile__header--img"]}>
          <img src={noImage} alt="User Profile Pic" />
          <span onClick={() => console.log("Open Modal Choose Pic")}>
            <EditOutlined />
          </span>
        </div>
        <div className={classes["profile__header--info"]}>
          <p>Joel Alves Pereira</p>
          <p>945.128.683-72</p>
          <p>joel_test@gmail.com</p>
        </div>
      </section>
      <Divider></Divider>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        ref={formRef}
      >
        <Form.Item label="Órgão" name="orgao" rules={[{ required: false }]}>
          <AntdSelect
            placeholder="Selecione seu órgão."
            optionsArray={orgaoList}
            onSelectChange={value => {
              setSelectedOrgaoId(value.value);
              api
                .get(`/unidade/byOrgao?orgaoId=${value.value}`)
                .then(res => {
                  setUnidades(
                    res.data.map(u => {
                      return { value: u._id, label: u["name"] };
                    })
                  );
                })
                .catch(e => console.error(e));
            }}
          />
        </Form.Item>

        <Form.Item label="Unidade" name="unidade" rules={[{ required: false }]}>
          <AntdSelect
            placeholder="Selecione sua unidade."
            optionsArray={unidades}
            onSelectChange={value => setSelectedUnidadeId(value.value)}
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Por favor, insira sua senha." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nova Senha"
          name="newPassword"
          rules={[
            { required: true, message: "Por favor, insira sua nova senha." },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirme Nova Senha"
          name="confirmNewPassword"
          rules={[
            { required: true, message: "Por favor, confirme sua nova senha." },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button key="submit" type="primary" htmlType="submit">
          Salvar Alterações
        </Button>
        {showAlert && (
          <Alert
            message={loginErrorMsg}
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
