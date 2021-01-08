import axios from 'axios';
import {AxiosRequestConfig} from 'axios';

export const config: AxiosRequestConfig = {
  baseURL: 'http://192.168.0.46:3333',
};

const api = axios.create(config);

export default api;
