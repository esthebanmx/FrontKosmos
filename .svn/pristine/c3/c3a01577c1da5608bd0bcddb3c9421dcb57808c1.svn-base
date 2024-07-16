import React from 'react';
import { Row, Col, Button } from 'antd'
import { useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { authenticatedState } from '../../reducers/auth-reducer';


function NotFound() {
    const navigate = useNavigate();
    const authenticated = useSelector(authenticatedState);
    const onClick = () => {
        if(authenticated){
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };
    return (
        <Row justify="center">
            <Col>
                <p>Ruta no encontrada</p>
                <Button type="primary" onClick={onClick}>Volver al inicio</Button>
            </Col>
        </Row>
    );
}

export default NotFound;