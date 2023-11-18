import backEnd from "../../constants/backEnd";
import endpoints from "../../constants/endpoints";
import api from "../api";
import { getCSRF } from "../getCSRF";



export async function instanciasGet(instancia=null, organizacao=null, assistente=null) {

    let csrf = await getCSRF();

    if (instancia){
        return api
        .get(`${backEnd.url}${endpoints.instancias.lista}`,{
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf?.csrfToken,
            },params: { superior: instancia, organizacao: organizacao }})
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
    else if (assistente){
        return api
        .get(`${backEnd.url}${endpoints.instancias.lista}`,{
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf?.csrfToken,
            },params: { assistente: assistente}})
        .then((response) => {
            return { type: "success", data: response.data };
        })
        .catch((error) => {
            return {
                type: "error",
                data: {
                    code: error.response.data.code,
                    detail: error.response.data.detail,
                },
            };
        });
    }
    else {

        return api
            .get(`${backEnd.url}${endpoints.instancias.lista}`,{
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrf?.csrfToken,
                }})
            .then((response) => {
                return { type: "success", data: response.data };
            })
            .catch((error) => {
                return {
                    type: "error",
                    data: {
                        code: error.response.data.code,
                        detail: error.response.data.detail,
                    },
                };
            });
    }
}