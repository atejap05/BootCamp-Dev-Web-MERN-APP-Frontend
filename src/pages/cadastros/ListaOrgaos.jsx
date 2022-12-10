import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Select, Spin, Divider } from "antd";

const ListaOrgaos = () => {

    const [ orgaos, setOrgaos ] = useState([]);
    const [ orgaoSelecionado, setOrgaoSelecionado ] = useState("");
    const apiSiorgOrgaosExecutivoFederal =
    "https://estruturaorganizacional.dados.gov.br/doc/orgao-entidade/resumida?codigoPoder=1&codigoEsfera=1";
    const [isLoading, setIsLoading] = useState(true);

    const [form] = Form.useForm();

    const handleChange = (value) => {
        console.log(value);
        setOrgaoSelecionado(value);
    };
    
    useEffect(()=>{
        try {
            const fetchOrgaosExecutivoFederal = async () => {
                const response = await axios.get(apiSiorgOrgaosExecutivoFederal);
                setOrgaos(response.data.unidades);
                console.log(response.data.unidades);
                setIsLoading(false);
            };
            fetchOrgaosExecutivoFederal();
        } catch (error) {
            console.log("Ocorreu o seguinte erro:")
            console.log(error);
        }
    },[apiSiorgOrgaosExecutivoFederal])

    return (
        <Divider>
            {
                isLoading && <Spin size="large" />
            }
            {
                !isLoading &&
                <Form>
            <Form.Item label="Órgão">
                <Select name="orgao" onChange={handleChange}>
                    {orgaos.map((orgao) => {
                        return (
                            <Select.Option
                                key={orgao.nome}
                                value={orgao.nome}
                            >
                                {orgao.nome}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
        </Form>
            }
            
        </Divider>

    )
}

export default ListaOrgaos;

