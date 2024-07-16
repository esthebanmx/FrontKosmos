import * as authServicesMine from '../services/auth.services';
import * as authTypes from '../constants/authActionTypes';
import * as authServices from '../services/auth.services';
import { getItem, setItem } from '../utils/storage';
import { encryptAES, encryptSha3 } from '../utils/crypt';
import { LOADER_VISIBILITY } from '../constants/overActionTypes';
// import { refreshToken } from '../utils/refreshToken';

export const userLogin = (request) => async (dispatch) => {
    try {
        const { data } = await authServicesMine.login(request);
        console.log(data);
    } catch (error) {
        return console.log("Hubo un error durante la autenticación: ", error);
    }
};

const encryptCredentials = (credentials) => {
    const { password } = credentials;
    const encryptedPass = encryptAES(password);
    const encryptSha = encryptSha3(password);
    const userData = { ...credentials, password: encryptedPass, encrypt: encryptSha };
    return userData;
  };
  
  const getBrowserName = () => {
    const { userAgent } = navigator;
    let browserName;
  
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = 'chrome';
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = 'firefox';
    } else if (userAgent.match(/safari/i)) {
      browserName = 'safari';
    } else if (userAgent.match(/opr\//i)) {
      browserName = 'opera';
    } else if (userAgent.match(/edg/i)) {
      browserName = 'edge';
    } else {
      browserName = 'No browser detection';
    }
    return browserName;
  };
  
  export const initApp = () => (dispatch) => {
    const userInfo = getItem('userInfo');
    let sessionInfo = getItem('sessionInfo');
    if (sessionInfo?.browser == null) {
      sessionInfo = {
        browser: getBrowserName(),
      };
      setItem('sessionInfo', sessionInfo);
    }
    dispatch({ type: authTypes.INIT_APP, userInfo });
    dispatch({ type: LOADER_VISIBILITY, isVisible: false });
  };
  
  export const selectRole = (userData, id) => (dispatch) => {
    const userInfo = { ...userData };
    // Se actualiza el rol en la bitacora
    if (id !== null) {
      const resultado = userInfo.roles.find((element) => element.idRol === id);
      const request = {
        idBitacora: userInfo.idSesion,
        rolUsuario: resultado.claveRol,
      };
      authServices.actualizaRol(request);
      userInfo.rolUsuario = resultado.claveRol; // Este es el cambio
    }
    //
    userInfo.roleId = id;
    setItem('userInfo', userInfo);
    dispatch({ type: authTypes.SELECT_USER_ROLE, roleId: id });
  };
  
  // Bypass login
  
  // export const login = () => async (dispatch) => {
  //   const datosUsuario = {
  //     nombre: 'Oscar Hernández Ortiz',
  //     username: 'oscar.hernadezor',
  //     roles: [
  //       {
  //         idRol: 1,
  //         icon: 'Administrador',
  //         nombreRol: 'Administrador',
  //         descripcion: 'Descripción de rol',
  //       },
  //       {
  //         idRol: 2,
  //         icon: 'Valida',
  //         nombreRol: 'Validador Oficinas Centrales',
  //         descripcion: 'Remite, asigna, atrae quejas dentro del sistema.',
  //       },
  //     ],
  //   };
  //   setItem('userInfo', datosUsuario);
  //   dispatch({ type: authTypes.VALIDATE_SESSION_SUCCESS, response: datosUsuario });
  //   return { success: true, datosUsuario };
  // };
  
  export const login = (credentials, reCaptchaToken) => async (dispatch) => {
    const userData = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(encryptCredentials(credentials));
      }, 500);
    });
    let sessionInfo = getItem('sessionInfo');
    // const { browser } = sessionInfo;
    const { browser } = getBrowserName();
    // if (sessionInfo?.browser == null) {
    //   sessionInfo = {
    //     browser: getBrowserName(),
    //   };
    //   setItem('sessionInfo', sessionInfo);
    // }
    setItem('sessionInfo', sessionInfo);
    const request = {
      usuario: userData.user,
      util: userData.password,
      versionAplicacion: 1,
      idSistema: 1,
      reCaptchaToken,
      versionCaptcha: 3,
      navegador: browser,
    };
    try {
      const {
        data: { entity = {} },
      } = await authServices.login(request);
      const { datosUsuario, message } = entity;
      if (datosUsuario != null) {
        setItem('userInfo', datosUsuario);
        dispatch({ type: authTypes.VALIDATE_SESSION_SUCCESS, response: datosUsuario });
      }
      return { success: datosUsuario != null, message, datosUsuario };
    } catch (error) {
      return { success: false };
    }
  };
  
  export const logout = () => async (dispatch) => {
    // dispatch({ type: SHOW_NOTIFICATIONS, isVisible: false });
    dispatch({ type: LOADER_VISIBILITY, isVisible: true });
    const userInfo = getItem('userInfo');
    const request = {
      idSesion: userInfo.idSesion,
    };
    try {
      await authServices.logout(request);
      return { success: true };
    } catch (error) {
      return { success: false };
    } finally {
      dispatch({ type: authTypes.LOGOUT });
      setItem('userInfo', null);
      setItem('token', null);
      setItem('previousSelections', null);
      dispatch({ type: LOADER_VISIBILITY, isVisible: false });
    }
  };
  
  // export const refreshSelfToken = () => async (dispatch) => {
  //   dispatch({ type: LOADER_VISIBILITY, isVisible: true });
  //   try {
  //     const {
  //       data: { token },
  //     } = await authServices.nuevoToken({});
  //     if (token != null) {
  //       refreshToken({ newToken: token });
  //     }
  //     return { success: true };
  //   } catch (error) {
  //     return { success: false };
  //   } finally {
  //     dispatch({ type: LOADER_VISIBILITY, isVisible: false });
  //   }
  // };
  