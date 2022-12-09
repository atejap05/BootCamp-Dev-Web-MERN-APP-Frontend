import React, { useState } from "react";
import { Button, Form } from "antd";
import AntdSelect from "../../components/UI/AntSelect";
import classes from "../../css/styles.module.css";

const DUMMY_OPTIONS = [
  {
    value: "1",
    label: "Pará",
  },
  {
    value: "2",
    label: "Piauí",
  },
  { value: "3", label: "Mato Grosso" },
];

const Incluir = ({}) => {
  const [selectedValues, setSelectedValues] = useState({});

  const onIncluirHandler = () => {
    console.log(selectedValues);
  };

  return (
    <section className={classes["incluir"]}>
      <div className={classes["incluir__title"]}>
        <h1>Intenções de Permuta</h1>
        <p>
          Nome: <span>Joel Alves Pereira</span>
        </p>
      </div>

      <div className={classes["incluir__origem"]}>
        <h3>Dados de Origem</h3>
        <div>
          <p>
            UF: <span>MT</span>
          </p>
          <p>
            Unidade: <span>DRF-Cuiabá</span>
          </p>
        </div>
      </div>
      <div className={classes["incluir__form"]}>
        <h3>Dados de Destino</h3>
        <div>
          <AntdSelect
            onSelectChange={value =>
              setSelectedValues(prev => {
                return { prev, value };
              })
            }
            optionsArray={DUMMY_OPTIONS}
            style={{ width: "20vw", marginRight: 50 }}
          />

          <AntdSelect
            onSelectChange={value =>
              setSelectedValues(prev => {
                return { prev, value };
              })
            }
            optionsArray={DUMMY_OPTIONS}
            style={{ width: "20vw", marginRight: 50 }}
          />

          <Button onClick={onIncluirHandler} type="primary" htmlType="submit">
            Incluir
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Incluir;
