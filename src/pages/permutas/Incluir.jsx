import React, {useEffect, useState} from "react";
import {Button, message} from "antd";
import AntdSelect from "../../components/UI/AntSelect";
import classes from "../../css/styles.module.css";
import api from "../../api/api.js";

const Incluir = () => {

    const [unidades, setUnidades] = useState([]);
    const [estados, setEstados] = useState([]);
    const [destinoId, setDestinoId] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    useEffect(() => {

        api.get('/state/all').then(res => {
            const allStates = res.data.map(e => {
                return {value: e['sigla'], label: e['nome']}
            })
            setEstados(allStates)
        }).catch(err => console.error(err.errors))
    }, [])

    const onIncluirHandler = async () => {

        if (destinoId.length === 0) {
            messageApi.open({
                type: 'error',
                content: 'Por favor, seleciona uma unidade de destino.',
            }).then()
            return
        }

        const payload = {
            origemId: loggedInUser['user']['unidadeId'],
            destinoId,
            userId: loggedInUser['user']['_id']
        }

        const intencao = await api.post('/intencao/create', payload)
        if (intencao?.data?.['createdAt']) {
            messageApi.open({
                type: 'success',
                content: 'Intenção de movimentação cadastrada com sucesso!',
            }).then()
        }
    };

    return (
        <section className={classes["incluir"]}>
            {contextHolder}
            <div className={classes["incluir__title"]}>
                <h1>Intenções de Permuta</h1>
                <p>
                    Nome: <span>{loggedInUser && loggedInUser['user']['name']}</span>
                </p>
            </div>

            <div className={classes["incluir__origem"]}>
                <h3>Dados de Origem</h3>
                <div>
                    <p>
                        UF: <span>{loggedInUser && loggedInUser['user']['unidadeId']['state']}</span>
                    </p>
                    <p>
                        Unidade: <span>{loggedInUser && loggedInUser['user']['unidadeId']['sigla']}</span>
                    </p>
                </div>
            </div>
            <div className={classes["incluir__form"]}>
                <h3>Dados de Destino</h3>
                <div>
                    <AntdSelect
                        onSelectChange={value => {

                            api.get(`/unidade/porEstado/${value.value}?orgaoId=${loggedInUser['user']['orgaoId']}`)
                                .then(res => {
                                    setUnidades(res.data.map(u => {return {value: u._id, label: u['name']}}))
                                }).catch(e => console.error(e))

                        }}
                        optionsArray={estados}
                        style={{width: "20vw", marginRight: 50}}
                    />

                    <AntdSelect
                        onSelectChange={value => setDestinoId(value.value)}
                        optionsArray={unidades}
                        style={{width: "20vw", marginRight: 50}}
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
