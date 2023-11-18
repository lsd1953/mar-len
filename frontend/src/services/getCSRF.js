import backEnd from '../constants/backEnd';
import endpoints from '../constants/endpoints';

export function getCSRF() {
  return fetch(`${backEnd.url}${endpoints.csrf}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async retorno => {
    let dados = await retorno.json();
    if (retorno.status !== 200) {
      throw new Error(dados.detail);
    }
    return dados;
  });
}