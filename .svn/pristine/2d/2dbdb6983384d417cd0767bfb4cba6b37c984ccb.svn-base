/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button } from 'antd'
import { auth, no_auth } from '../../reducers/auth-reducer';
import { LoginForm } from '../LoginForm/LoginForm';
import { userLogin } from '../../actions/auth.actions';
import { authenticatedState } from '../../reducers/auth-reducer';

function Home() {
    const [form] = Form.useForm();
    const authenticated = useSelector(authenticatedState);
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState(false);
    // console.log(authenticated);

    const authUser = async (values) => {
        const user = values.user;
        const pass = values.pass;

        const request = { user, pass };

        // const { logguedUser } = await dispatch(userLogin(request));
        // if (logguedUser) {
        //     changeLogguedUser();
        // }
        // console.log(logguedUser);

        if (user === "user" && pass === "password") {
            navigate("dashboard");
            dispatch(auth());
        } else {
            setShowMsg(true);
        }
    };

    const onFinish = (values) => {
        // console.log(values);
        authUser(values);
    };

    const dispatch = useDispatch();

    const changeLogguedUser = useCallback(
        () => (authenticated ? dispatch(no_auth()) : dispatch(auth())), [authenticated, dispatch]
    );

    const onValuesChange = (_, data) => {
        // console.log('data', data);
        const { user, pass } = data;
        const regex = /[^A-Za-z0-9|.|-]/g;
        let nUser = user.toLowerCase();
        let nPassword = pass;
        if (user !== undefined && user !== null) {
            const userTest = regex.test(user) || user.length > 20;
            if (userTest) {
              nUser = nUser.slice(0, -1);
            }
        }
        if (pass !== undefined && pass !== null) {
            const passwordTest = pass.length > 20;
            if (passwordTest) {
                nPassword = nPassword.slice(0, -1);
            }
        }
        form.setFieldsValue({
          user: nUser,
          password: nPassword,
        });
      };

    return (
        <Row justify="center" align="middle">
            <Col>
                <LoginForm />
                {/* <Form
                    layout='vertical'
                    form={form}
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    >
                    <Form.Item name='user' label="Usuario" rules={[{ required: true }]}>
                        <Input placeholder='Usuario' size="large" />
                    </Form.Item>
                    <Form.Item name='pass' label="Contraseña" rules={[{ required: true }]}>
                        <Input.Password placeholder='Contraseña' size="large" />
                    </Form.Item>
                    <Button htmlType='submit' type="primary">Iniciar sesión</Button>
                </Form> */}
                {/* <p>{authenticated ? null : "Usuario o contraseña incorrectos"} </p> */}
                {showMsg ? <p>Usuario o contraseña incorrectos</p> : null}
            </Col>
        </Row>
    );
}

export default Home;