import backEnd from "../../constants/backEnd";
import endpoints from "../../constants/endpoints";
import { getCSRF } from "../getCSRF";

export async function userRegisterPost(json) {
    let csrf = await getCSRF();
    return fetch(`${backEnd.url}${endpoints.user.register}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf?.csrfToken,
        },
        body: JSON.stringify(json),
    }).then(async (retorno) => {
        let dados = await retorno.json();
        let result = {
            type: retorno.status === 201 ? 'success' : 'error',
            data: dados
          };
        return result;
    });
}