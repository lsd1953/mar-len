import axios from 'axios';

import backEnd from '../constants/backEnd';

const api = axios.create({
  baseURL: backEnd.url,
});

export default api;