import React from "react";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    dataInclusao: "01/01/01",
    unidadeOrigem: "DRF-Cuiabá",
    ufOrigem: "MT",
    unidadeDestino: "DRF-Sao Jose dos Campos",
    ufDestino: "SP",
  },
  {
    key: "2",
    dataInclusao: "01/01/01",
    unidadeOrigem: "DRF-Cuiabá",
    ufOrigem: "MT",
    unidadeDestino: "DRF-Nova York",
    ufDestino: "NY",
  },
];

const Manifestacoes = () => (
  <Table dataSource={data}>
    <ColumnGroup title="DADOS DA ORIGEM">
      <Column
        title="Data da Inclusão"
        dataIndex="dataInclusao"
        key="dataInclusao"
      />
      <Column title="Unidade" dataIndex="unidadeOrigem" key="unidadeOrigem" />
      <Column title="UF" dataIndex="ufOrigem" key="ufOrigem" />
    </ColumnGroup>
    <ColumnGroup title="DADOS DO DESTINO">
      <Column title="Unidade" dataIndex="unidadeDestino" key="unidadeDestino" />
      <Column title="UF" dataIndex="ufDestino" key="ufDestino" />
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
);
export default Manifestacoes;
