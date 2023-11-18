import backEnd from "../../../constants/backEnd";
import endpoints from "../../../constants/endpoints";
import api from "../../api";
import { getCSRF } from "../../getCSRF";


export async function administracaoFuncoesGet(organizacao) {
    let csrf = await getCSRF();
    return api
        .get(`${backEnd.url}${endpoints.administracao.funcao.lista}`,{
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf?.csrfToken,
            },params: { organizacao: organizacao }})
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