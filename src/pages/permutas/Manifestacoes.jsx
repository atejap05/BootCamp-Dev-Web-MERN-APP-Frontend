import React, { useEffect, useState } from "react";
import {message, Space, Table} from "antd";
import api from "../../api/api";
import { DeleteOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

const Manifestacoes = () => {
  const [data, setData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    api
      .get(`/intencao/byUser/${loggedInUser["user"]["_id"]}`)
      .then(res => {
        // console.log(res.data);
        setData(
          res.data.map(i => {
            return {
              key: i._id,
              dataInclusao: new Date(i["createdAt"]).toLocaleDateString(
                "pt-BR"
              ),
              unidadeOrigem: i.origemId["sigla"],
              ufOrigem: i.origemId.state,
              unidadeDestino: i.destinoId["sigla"],
              ufDestino: i.destinoId.state,
            };
          })
        );
      })
      .catch(err => console.error(err));
  }, []);

  const onDeleteManifestacaoHandler = record => {
    const intencaoId = record.key;
    api
      .delete(`/intencao/delete/${intencaoId}`)
      .then(_ => {
        setData(prev => prev.filter(data => data.key !== intencaoId));
          messageApi.open({
              type: 'success',
              content: 'Intenção excluída com sucesso!',
          }).then()
      })
      .catch(err => console.log(err));
  };

  return (
    <>
        {contextHolder}
      <h1>Minhas Manifestações</h1>
      <br />
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
          <Column title="UF" dataIndex="ufOrigem" key="ufOrigem" />
        </ColumnGroup>
        <ColumnGroup title="DADOS DO DESTINO">
          <Column
            title="Unidade"
            dataIndex="unidadeDestino"
            key="unidadeDestino"
          />
          <Column title="UF" dataIndex="ufDestino" key="ufDestino" />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <span>
                  <DeleteOutlined
                    style={{ color: "#e03131" }}
                    onClick={() => onDeleteManifestacaoHandler(record)}
                  />
                </span>
              </Space>
            )}
          />
        </ColumnGroup>
      </Table>
    </>
  );
};
export default Manifestacoes;
