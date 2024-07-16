/* eslint-disable no-unused-vars */
import api from '../services/api';
import { getURLAuth, getURLLogout } from './servers';
import * as services from '../constants/servicesRoutes';

// export const login = (data) => api.post(`${getURLAuth()}${services.INGRESA_SISTEMA}`, data);

export const validateSession = (data) =>
  api.post(`${getURLAuth()}${services.VALIDATE_SESSION}`, data);

export const login = (data) => api.post(`${getURLAuth()}${services.INGRESA_SISTEMA}`, data);

export const logout = (data) => api.post(`${getURLLogout()}${services.CIERRA_SESION}`, data);

export const actualizaRol = (data) => api.post(`${getURLAuth()}${services.ACTUALIZA_ROL}`, data);

export const nuevoToken = (data) => api.post(`${getURLAuth()}${services.NUEVO_TOKEN}`, data);