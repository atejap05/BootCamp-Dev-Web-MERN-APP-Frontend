import axios from "axios";
import { useEffect, useState } from "react";

const ListaUnidades = () => {

    const [ codigoUnidade, setCodigoUnidade ] = useState("");
    const [ unidades, setUnidades ] = useState([]);
    
    const apiSiorgEstruturaOrgao =
    `https://estruturaorganizacional.dados.gov.br/doc/unidade-organizacional/${codigoUnidade}/estrutura`;

    const apiSiorgDadosUnidade =
    `https://estruturaorganizacional.dados.gov.br/doc/unidade-organizacional/${codigoUnidade}/completa`;

    useEffect(()=>{
        try {
            const fetchEstruturaOrgao = async () => {
                const response = await axios.get(apiSiorgEstruturaOrgao);
                setUnidades(response.data);
            }
            fetchEstruturaOrgao();
        } catch (error) {
            console.log(error);
        }
    },[apiSiorgEstruturaOrgao, codigoUnidade])

    return (
        <div></div>
    )
}

export default ListaUnidades;