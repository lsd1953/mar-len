import backEnd from "../../../constants/backEnd";
import endpoints from "../../../constants/endpoints";
import api from "../../api";
import { getCSRF } from "../../getCSRF";


export async function administracaoInstanciasVincularPost(json) {
    let csrf = await getCSRF();
    return api
        .post(`${backEnd.url}${endpoints.administracao.instancias.vincula}`, json, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf?.csrfToken,
            },
        })
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