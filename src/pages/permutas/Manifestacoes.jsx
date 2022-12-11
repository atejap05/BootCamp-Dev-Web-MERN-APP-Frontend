import React, {useEffect, useState} from "react";
import {Space, Table} from "antd";
import api from "../../api/api";

const {Column, ColumnGroup} = Table;

const Manifestacoes = () => {

    const [data, setData] = useState([])

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    useEffect(() => {
        api.get(`/intencao/byUser/${loggedInUser['user']['_id']}`)
            .then(res => {
                console.log(res.data)
                setData(res.data.map(i => {

                    return {
                        key: i._id,
                        dataInclusao: new Date(i['createdAt']).toLocaleDateString('pt-BR'),
                        unidadeOrigem: i.unidadeOrigem['sigla'],
                        ufOrigem: i.unidadeOrigem.state,
                        unidadeDestino:  i.unidadeDestino['sigla'],
                        ufDestino: i.unidadeDestino.state,
                    }
                }))
            })
            .catch(err => console.error(err))
    }, []);

    return (
        <>
            <h1>Minhas Manifestacões</h1>
            <br/>
            <Table dataSource={data}>
                <ColumnGroup title="DADOS DA ORIGEM">
                    <Column
                        title="Data da Inclusão"
                        dataIndex="dataInclusao"
                        key="dataInclusao"
                    />
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
        </>
    );
};
export default Manifestacoes;
