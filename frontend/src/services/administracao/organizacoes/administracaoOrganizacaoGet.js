import backEnd from "../../../constants/backEnd";
import endpoints from "../../../constants/endpoints";
import api from "../../api";


export async function administracaoOrganizacaoGet() {
    return api
        .get(`${backEnd.url}${endpoints.administracao.organizacoes.lista}`)
        .then((response) => {
            return { type: "success", data: response.data };
        })
        .catch((error) => {
            return {
                type: "error",
                data: {
                    code: error.response.status,
                    detail: error.response.data,
                },
            };
        });
}