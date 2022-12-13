import React, {useEffect, useState} from "react";
import classes from "../../css/styles.module.css";
import {Button, Space, Table} from "antd";
import AntdSelect from "../../components/UI/AntSelect";
import api from "../../api/api.js";


const {Column, ColumnGroup} = Table;

const Consultar = () => {

    const [estados, setEstados] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [unidades, setUnidades] = useState([]);
    const [selectedUnidadeId, setSelectedUnidadeId] = useState("");
    const [data, setData] = useState([]);


    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    useEffect(() => {
        api
            .get("/state/all")
            .then(res => {
                const allStates = res.data.map(e => {
                    return {value: e["sigla"], label: e["nome"]};
                });
                setEstados(allStates);
            })
            .catch(err => console.error(err.errors));

    }, []);


    const onConsultar = () => {

        // TODO alerta se não selecionar um estado.

        let url = `/intencao/all?state=${selectedState}`
        if (selectedUnidadeId) url = url + `&destinoId=${selectedUnidadeId}`

        api.get(url)
            .then(resposta => {
                setData(resposta.data.map(i => {

                    let cpf = String(i.userId?.cpf).slice(-5)
                    cpf = "***.***." + cpf.substring(0, 3) + "-" + cpf.slice(-2)

                    return {
                        key: i._id,
                        cpf: cpf,
                        dataInclusao: new Date(i['createdAt']).toLocaleDateString('pt-BR'),
                        unidadeOrigem: i.origemId['sigla'],
                        ufOrigem: i.origemId.state,
                        unidadeDestino:  i.destinoId['sigla'],
                        ufDestino: i.destinoId.state,
                    }
                }))
            })
            .catch(e => console.error(e))

    }

    return (
        <section className={classes["consultar"]}>
            <div className={classes["consultar__title"]}>
                <h1>Consulta Origen Disponíveis</h1>
            </div>

            <div className={classes["consultar__form"]}>
                <h3>Dados de Origem</h3>
                <div className={classes["consultar__selects"]}>
                    <AntdSelect
                        onSelectChange={value => {
                            setSelectedState(value.value)
                            api.get(`/unidade/porEstado/${value.value}?orgaoId=${loggedInUser['user']['orgaoId']['_id']}`)
                                .then(res => {
                                    setUnidades(res.data.map(u => {
                                        return {value: u._id, label: u['name']}
                                    }))
                                }).catch(e => console.error(e))
                        }}
                        optionsArray={estados}
                        placeholder={"Selecione o Estado"}
                        style={{width: "20vw", marginRight: 50}}
                    />

                    <AntdSelect
                        onSelectChange={value => setSelectedUnidadeId(value.value)}
                        optionsArray={unidades}
                        placeholder={"Selecione a Unidade"}
                        style={{width: "20vw", marginRight: 50}}
                    />

                    <Button onClick={onConsultar} type="primary" htmlType="submit">
                        Consultar
                    </Button>
                </div>
            </div>
            <div className={classes["consultar__table"]}>
                <p>Permutas Disponíveis:</p>
                <br/>
                <Table dataSource={data}>
                    <ColumnGroup title="DADOS DA ORIGEM">
                        <Column
                            title="Data da Inclusão"
                            dataIndex="dataInclusao"
                            key="dataInclusao"
                        />
                        <Column title="CPF" dataIndex="cpf" key="cpf"/>
                        <Column
                            title="Unidade"
                            dataIndex="unidadeOrigem"
                            key="unidadeOrigem"
                        />
                        <Column title="UF" dataIndex="ufOrigem" key="ufOrigem"/>
                    </ColumnGroup>
                    <ColumnGroup title="DADOS DO DESTINO">
                        <Column
                            title="Unidade"
                            dataIndex="unidadeDestino"
                            key="unidadeDestino"
                        />
                        <Column title="UF" dataIndex="ufDestino" key="ufDestino"/>
                        <Column
                            title="Action"
                            key="action"
                            render={(_, record) => (
                                <Space size="middle">
                                    <a>Detalhes</a>
                                </Space>
                            )}
                        />
                    </ColumnGroup>
                </Table>
            </div>
        </section>
    );
};

export default Consultar;
