import {Button, Divider, Form, Select, Space} from "antd";
import Input from "antd/es/input/Input";
import React, {useEffect, useState} from "react";
import api from "../../api/api";


const PainelAdmin = () => {

  const [formO] = Form.useForm();
  const [formU] = Form.useForm();

  const [orgaos, setOrgaos] = useState([])

  const layout = {
    labelCol: {
      span: 1
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect( () => {

    api.get('/orgao')
      .then(res => {
        setOrgaos(res.data.map(o => {return{value: o._id, label: o.name}}))
      })
      .catch(e => console.error(e))

  }, [])

  return (
    <div>
      <Form {...layout} form={formO}>

        <Space direction={'vertical'}>
          <h2>Cadastramento de Órgãos</h2>
        </Space>
        <Form.Item
          name="orgaoNome"
          label="Nome"
          rules={[
            {required: true},
          ]}
        >
          <Input type={'text'} placeholder={'Informe o nome do órgão'}/>
        </Form.Item>
        <Form.Item
          name="orgaoSigla"
          label="Sigla"
          rules={[
            {required: true},
          ]}
        >
          <Input type={'text'} placeholder={'Informe a sigla do órgão'}/>
        </Form.Item>
        <Button key="submit" type="primary" htmlType="submit">Cadastrar/Atualizar Órgão</Button>
        <Divider/>
      </Form>
      <Form {...layout} form={formU}>
        <Space direction={'vertical'}>
          <h2>Cadastramento de Unidades</h2>
        </Space>
        <Form.Item
          name="orgaoSigla"
          label="Órgão"
          rules={[
            {required: true},
          ]}
        >
          <Select showSearch
                  placeholder="Selecione um órgão"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                  options={orgaos}
          >
          </Select>
        </Form.Item>

        <Form.Item
          name="unidadeNome"
          label="Nome"
          rules={[
            {required: true},
          ]}
        >
          <Input type={'text'} placeholder={'Informe o nome do unidade'}/>
        </Form.Item>
        <Form.Item
          name="unidadeSigla"
          label="Sigla"
          rules={[
            {required: true},
          ]}
        >
          <Input type={'text'} placeholder={'Informe a sigla do unidade'}/>
        </Form.Item>
        <Button key="submit" type="primary" htmlType="submit">Cadastrar/Atualizar Unidade</Button>
        <Divider/>
      </Form>
    </div>
  );
};

export default PainelAdmin;