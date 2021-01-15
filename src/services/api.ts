import axios from 'axios';
import {AxiosRequestConfig} from 'axios';

export const config: AxiosRequestConfig = {
  baseURL: 'https://73870f262f05.ngrok.io/api/v1/',
};

const api = axios.create(config);

export default api;
