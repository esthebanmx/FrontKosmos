import axios from 'axios';
import { authRequest, authResponseFailed, authResponseSuccess } from './auth.interceptor';

const ApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
ApiInstance.interceptors.request.use(authRequest);
ApiInstance.interceptors.response.use(authResponseSuccess, authResponseFailed);

export default ApiInstance;