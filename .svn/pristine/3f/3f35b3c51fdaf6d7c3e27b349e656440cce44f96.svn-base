/* eslint-disable */
import CryptoJS from 'crypto-js';
import { sha3_256 } from 'js-sha3';

/* eslint-disable eol-last */
const { REACT_APP_SECRET_KEY, REACT_APP_SECRET_SALT, REACT_APP_SECRET_IV } = process.env;

export const decryptAES = (msg) =>
  CryptoJS.AES.decrypt(msg, CryptoJS.enc.Utf8.parse(REACT_APP_SECRET_KEY), {
    iv: CryptoJS.enc.Hex(REACT_APP_SECRET_IV),
  }).toString(CryptoJS.enc.Utf8);

const generateKey = (salt, passPhrase, keyLength, iterationCount) => {
  const key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), { keySize: keyLength / 32, iterations: iterationCount });
  return key;
};

const encrypt = (salt, iv, passPhrase, keyLength, iterationCount, plainText) => {
  const key = generateKey(salt, passPhrase, keyLength, iterationCount);
  const params = {
    iv: CryptoJS.enc.Hex.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  };
  const encrypted = CryptoJS.AES.encrypt(plainText, key, params);
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

export const encryptAES = (msg) =>
  encrypt(REACT_APP_SECRET_SALT, REACT_APP_SECRET_IV, REACT_APP_SECRET_KEY, 256, 65536, msg);

/**
 * Método para encriptar la cadena en el
 * algoritmo sha3
 * @param {*} claveUsuario
 * @returns  clave encriptada
 */
export const encryptSha3 = (claveUsuario) => {
  sha3_256 = require('js-sha3').sha3_256;
  var claveCompuesta = claveUsuario + REACT_APP_SECRET_SALT;
  var claveSha3 = sha3_256(claveCompuesta);
  return claveSha3;
};
