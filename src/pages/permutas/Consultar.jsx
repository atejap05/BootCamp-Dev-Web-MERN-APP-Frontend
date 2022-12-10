import React, { useState, useEffect } from "react";
import classes from "../../css/styles.module.css";
import { Button } from "antd";
import AntdSelect from "../../components/UI/AntSelect";

import api from "../../api/api";
const UNIDADES_CACHE = {};

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
    <section className={classes["incluir"]}>
      <div className={classes["incluir__title"]}>
        <h1>Consulta Destino Disponíveis</h1>
        <p>
          Nome: <span>Joel Alves Pereira</span>
        </p>
      </div>

      <div className={classes["incluir__form"]}>
        <h3>Dados de Destino</h3>
        <div>
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
    </section>
  );
};

export default Consultar;
