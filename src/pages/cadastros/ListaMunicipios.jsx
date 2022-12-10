import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Form, Select } from "antd";

const siglasUf = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
];

const ListaMunicipios = () => {
    const [uf, setUf] = useState("");
    const [municipios, setMunicipios] = useState([]);
    const apiIbgeMunicipiosUf =
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

    const [form] = Form.useForm();

    const handleChange = (value) => {
        setUf(value);
    };

    useEffect(() => {
        try {
            const fetchMunicipios = async () => {
                const response = await axios.get(apiIbgeMunicipiosUf);
                setMunicipios(response.data);
            };
            fetchMunicipios();
        } catch (error) {
            console.log(error);
        }
    }, [apiIbgeMunicipiosUf, uf]);

    return (
        <Form>
            <Form.Item label="UF">
                <Select name="uf" onChange={handleChange}>
                    {siglasUf.map((siglaUf) => {
                        return (
                            <Select.Option key={siglaUf} value={siglaUf}>
                                {siglaUf}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item label="Município">
                <Select name="municipio">
                    {municipios.map((municipio) => {
                        return (
                            <Select.Option
                                key={municipio.nome}
                                value={municipio.nome}
                            >
                                {municipio.nome}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ListaMunicipios;
