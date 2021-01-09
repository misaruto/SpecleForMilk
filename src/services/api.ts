import axios from 'axios';
import {AxiosRequestConfig} from 'axios';

export const config: AxiosRequestConfig = {
  baseURL: 'http://bd16ed04ed1f.ngrok.io/api/v1/',
};

const api = axios.create(config);

export default api;
