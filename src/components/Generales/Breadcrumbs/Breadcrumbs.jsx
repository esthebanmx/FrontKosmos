import { Col, Row, Breadcrumb, Space, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './Breadcrumbs.scss';
import FechaHora from '../FechaHora/FechaHora';
import { getItem } from '../../../utils/storage';

export function Breadcrumbs({ items = [] }) {
  const usuario = getItem('userInfo');
  const navigate = useNavigate();
  const renderItems = [...items];
  if (renderItems.length > 0) {
    renderItems.splice(0, 0, 'Inicio');
  }
  const buttonItems = renderItems?.slice(0, -1);

  

  const navegarMigas = (item, label) => {
    if (label === 'Inicio') {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Row justify="space-between" align="middle" className="migas-container">
        <Col>
          <Space>
            {buttonItems?.map((label, index) => (
              <div key={label}>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    navegarMigas(renderItems.length - index, label);
                  }}
                >
                  {label}
                </Button>
                <span className="separador">/</span>
              </div>
            ))}
            {renderItems?.length > 0 && (
              <span className="actual">
                {renderItems[renderItems.length - 1]}
              </span>
            )}
          </Space>
        </Col>
        <Col>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <small className="txt-user">
              Hola, {usuario}
            </small>
            <FechaHora />
          </Space>
        </Col>
      </Row>
    </>
  );
}
