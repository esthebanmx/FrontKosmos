/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
// import './LoginForm.less';
import { Input, Form, Button, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons'; // Iconos
import { login, selectRole } from '../../actions/auth.actions';
import { LOADER_VISIBILITY } from '../../constants/overActionTypes';
import { setItem } from '../../utils/storage';
import { auth } from '../../reducers/auth-reducer';

function LoginForm({ onDismiss }) {
  const [isLoginEnabled, setIsLoginEnabled] = useState(true);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loginForm] = Form.useForm();
  const initialLoginFormValues = {
    user: '',
    password: '',
  };

  const loginProcess = async (credentials, token) => {
    dispatch({ type: LOADER_VISIBILITY, isVisible: true });
    const result = await dispatch(login(credentials, token));
    if (result.success) {
      onDismiss();
      const { datosUsuario } = result;
      console.log(datosUsuario);
      setItem('userInfo', datosUsuario);
      const { roles } = datosUsuario;
      const { idEstado } = datosUsuario;
      const { idDistrito } = datosUsuario;
      const role = roles[0].idRol;
      setItem('infoGeografico', { idEstado, idDistrito });
      if (roles.length) {
        // navigate(ROLE_SELECTION);
        navigate("/dashboard");
        dispatch(selectRole(datosUsuario, role));
      }
    } else {
      console.warn('Login:', result.message);
      setMessage(result.message ?? 'Ha ocurrido un error en la autenticación.');
    }
    dispatch({ type: LOADER_VISIBILITY, isVisible: false });
  };

  const handleReCaptchaVerify = useCallback(
    async (credentials) => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const token = await executeRecaptcha('Login');
      loginProcess(credentials, token);
    },
    [executeRecaptcha],
  );

  // Events
  const onFinish = (data) => {
    console.log(data);
    console.log(data.user);
    //handleReCaptchaVerify(data);
    setItem('userInfo', data.user);
    navigate("dashboard");
    dispatch(auth());
  };

  const onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  const onValuesChange = (_, data) => {
    const { user, password } = data;
    setIsLoginEnabled(user.length !== 0 && password.length !== 0);
    const regex = /[^A-Za-z0-9|.|-]/g; // Expresion para detectar caracteres no permitidos
    const userTest = regex.test(user) || user.length > 20;
    const passwordTest = password.length > 20;
    let nUser = user.toLowerCase();
    let nPassword = password;
    if (userTest) {
      nUser = nUser.slice(0, -1);
    }
    if (passwordTest) {
      nPassword = nPassword.slice(0, -1);
    }
    loginForm.setFieldsValue({
      user: nUser,
      password: nPassword,
    });
  };

  const onInputFocus = () => {
    setMessage(null);
  };

  return (
    <section className="login-section">
      <div className="title margin-center">
        <div className="logo-container" >
          {/* <img src={Logo} alt="logo" /> */} {/* TODO: AGREGAR IMAGEN DEL SISTEMA */}
        </div>
        <h3>Demo Blank</h3> {/* TODO: CAMBIAR EL NOMBRE DEL SISTEMA */}
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={initialLoginFormValues}
        onFinish={onFinish}
        form={loginForm}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        layout="vertical"
      >
        <Form.Item
          className="input-item"
          name="user"
          id="user"
          label="Usuario"
          rules={[
            {
              required: true,
              message: 'Ingresa usuario',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="login-form-item-icon" />}
            onFocus={onInputFocus}
            className="login-form-input"
            size="large"
          />
        </Form.Item>
        <Form.Item
          className={`input-item ${message != null ? 'no-margin' : ''}`}
          name="password"
          id="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: 'Ingresa contraseña',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="login-form-item-icon" />}
            onFocus={onInputFocus}
            className="login-form-input"
            size="large"
          />
        </Form.Item>
        {message && (
          <div className="message">
            <ExclamationCircleOutlined />
            <span>{message}</span>
          </div>
        )}
        <Form.Item className="login-button">
          <Button className="login" type="primary" size="large" htmlType="submit" disabled={!isLoginEnabled} style={{width: '100%'}}>
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>      
    </section>
  );
}

export { LoginForm };
