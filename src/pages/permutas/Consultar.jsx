import React, {useEffect, useState} from "react";
import classes from "../../css/styles.module.css";
import {Button, Space, Table} from "antd";
import AntdSelect from "../../components/UI/AntSelect";
import api from "../../api/api.js";

const UNIDADES_CACHE = {};
const { Column, ColumnGroup } = Table;

const Consultar = () => {

  const [unidades, setUnidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [data, setData] = useState([]);


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

    api.get('/intencao/all')
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

  }, []);

  const onIncluirHandler = () => {};

  return (
    <section className={classes["consultar"]}>
      <div className={classes["consultar__title"]}>
        <h1>Consulta Destino Disponíveis</h1>
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
        <p>Permutas Disponíveis:</p>
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
