/* eslint-disable no-unused-vars */
// import { getItem } from '../utils/storage';
// import { refreshToken } from '../utils/refreshToken';
import { INGRESA_SISTEMA } from '../constants/servicesRoutes';

export const authResponseSuccess = (response) => {
  try {
    const { data } = response;
    const {
      data: { entity },
    } = response;
    const code = response.status;
    if (code !== 200) {
      throw entity;
    }
  } catch (error) {
    throw response.data;
  }
  return response;
};

export const authResponseFailed = (response) => {
  console.log('response failed', response);
  throw response;
};

export const authRequest = (config) => {
  const newConfig = config;
//   if (!config.url.includes(INGRESA_SISTEMA) && !config.url.includes('geolocation')) {
//     const token = userInfo?.tknA;
//     const newToken = getItem('token');
//     if (newToken != null) {
//       newConfig.headers.Authorization = newToken;
//     } else {
//       newConfig.headers.Authorization = token;
//     }
//   }
  return newConfig;
};
