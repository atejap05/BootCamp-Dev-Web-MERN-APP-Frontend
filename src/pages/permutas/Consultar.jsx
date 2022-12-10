import React, { useState, useEffect } from "react";
import classes from "../../css/styles.module.css";
import { Button } from "antd";
import AntdSelect from "../../components/UI/AntSelect";
import { Space, Table } from "antd";
import api from "../../api/api";
const UNIDADES_CACHE = {};
const { Column, ColumnGroup } = Table;

// Table results
const data = [
  {
    key: "1",
    cpf: "***.***.683-72",
    dataInclusao: "01/01/01",
    unidadeOrigem: "DRF-Cuiabá",
    ufOrigem: "MT",
    unidadeDestino: "DRF-Sao Jose dos Campos",
    ufDestino: "SP",
  },
  {
    key: "2",
    cpf: "***.***.683-72",
    dataInclusao: "01/01/01",
    unidadeOrigem: "DRF-Cuiabá",
    ufOrigem: "MT",
    unidadeDestino: "DRF-Nova York",
    ufDestino: "NY",
  },
];

const Consultar = () => {
  const [unidades, setUnidades] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    api
      .get("/state/all")
      .then(res => {
        const allStates = res.data.map(e => {
          return { value: e["sigla"], label: e["nome"] };
        });
        setEstados(allStates);
      })
      .catch(err => console.error(err.errors));
  }, []);

  const onIncluirHandler = () => {};

  return (
    <section className={classes["consultar"]}>
      <div className={classes["consultar__title"]}>
        <h1>Consulta Destino Disponíveis</h1>
        <p>
          Nome: <span>Joel Alves Pereira</span>
        </p>
      </div>

      <div className={classes["consultar__form"]}>
        <h3>Dados de Destino</h3>
        <div className={classes["consultar__selects"]}>
          <AntdSelect
            onSelectChange={value => {
              if (UNIDADES_CACHE.hasOwnProperty(value.value)) {
                setUnidades(UNIDADES_CACHE[value.value]);
              } else {
                api
                  .get(`/unidade/${value.value}`)
                  .then(res => {
                    const unidadeslist = [];
                    res.data.forEach(u =>
                      unidadeslist.push({ value: u._id, label: u["name"] })
                    );
                    setUnidades(unidadeslist);
                    UNIDADES_CACHE[value.value] = unidadeslist;
                  })
                  .catch(e => console.error(e));
              }
            }}
            optionsArray={estados}
            placeholder={"Select UF"}
            style={{ width: "20vw", marginRight: 50 }}
          />

          <AntdSelect
            optionsArray={unidades}
            placeholder={"Select Unidade"}
            style={{ width: "20vw", marginRight: 50 }}
          />

          <Button onClick={onIncluirHandler} type="primary" htmlType="submit">
            Consultar
          </Button>
        </div>
      </div>
      <div className={classes["consultar__table"]}>
        <p>Intenões de Permuta para:</p>
        <br />
        <Table dataSource={data}>
          <ColumnGroup title="DADOS DA ORIGEM">
            <Column
              title="Data da Inclusão"
              dataIndex="dataInclusao"
              key="dataInclusao"
            />
            <Column title="CPF" dataIndex="cpf" key="cpf" />
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
