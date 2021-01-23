import axios from 'axios';
import {AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
export const config: AxiosRequestConfig = {
  baseURL: Config.API_URL,
};

const api = axios.create(config);

export default api;
