/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Menu, Drawer, Row, Col, Space, Tooltip } from "antd";
import Icon, {
  UserOutlined,
  QuestionOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { ReactComponent as UserIcon } from "../../assets/images/usuario.svg";
import { ReactComponent as HelpIcon } from "../../assets/images/question.svg";
import { LoginForm } from "../LoginForm/LoginForm";
import {
  selectUserInfo,
  isUserAuthenticated,
  selectSelectedRole,
} from "../../selectors/auth.selector";
// import './Header.less';
import "./Header.scss";
import { logout } from "../../actions/auth.actions";
import * as routes from "../../constants/routes";
import { no_auth } from "../../reducers/auth-reducer";
import MainMenu from "../MainMenu/MainMenu";
import { authenticatedState } from "../../reducers/auth-reducer";
import { getItem } from "../../utils/storage";



function Header() {

  const authenticated = useSelector(authenticatedState);
  const usuario = getItem('userInfo');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

    // Events
  const onCloseModal = () => {
    setIsLoginVisible(false);
  };
  const onLogOut = async () => {    
    navigate("/");
    dispatch(no_auth());
  };
  const onLogIn = () => {
    setIsLoginVisible(true);
  };

  // Render Methods
  const renderRightItems = () => {
    if (authenticated) {
      return (
        // !isPhone && isAutenticated
        <Space>
          <Button
            type="text"
            id="idBotonAyuda"
            icon={<Icon component={HelpIcon} style={{ fontSize: "25px" }} />}
            size="large"
          >
            Centro de ayuda
          </Button>
          <Icon component={UserIcon} style={{ fontSize: "25px" }} />
          {/* <UserOutlined style={{ fontSize: '25px' }} /> */}
          <span>{usuario}</span>  {/* TODO:SETEAR VALOR DEL USUARIO LOGEADO   */}        
          <div className="separator" />
          <Button
            className="logout"
            onClick={onLogOut}
            type="primary"
            size="large"
            icon={<CloseCircleFilled />}
          >
            Cerrar sesión
          </Button>
        </Space>
      );
    }
    return (
      <>
        <Tooltip title="Centro de Ayuda">
          <Button
            type="text"
            id="idBotonAyuda"
            icon={<Icon component={HelpIcon} style={{ fontSize: "25px" }} />}
            size="large"
          >
            Centro de ayuda
          </Button>
        </Tooltip>
      </>
    );
  };

  return (
    <>
      <Row data-testid="header" align="middle" id="mainHeader">
        <Col className="logo-name-container">
          {/* <img src={Logo} alt="logo" className="logo" /> */} {/* //TODO: AGREGAR IMAGEN DEL SISTEMA */}
          <h1>Demo Blank</h1> {/* //TODO: AGREGAR TEXTO DEL SISTEMA */}
        </Col>
        <Col className="rigth-elements">{renderRightItems()}</Col>
      </Row>
      {authenticated ? (
        <Row id="mainMenu">
          <Col span={24}>
            <MainMenu />
          </Col>
        </Row>
      ) : null}
      <Modal
        centered
        className="home-login-modal"
        open={isLoginVisible}
        closable
        footer={null}
        onCancel={onCloseModal}
        width={400}
        zIndex={5}
        destroyOnClose
      >
        <LoginForm onDismiss={onCloseModal} />
      </Modal>
      {/* <ComplaintModal complaint={selectedComplaint} setComplaint={setSelectedComplaint} /> */}
      <Drawer
        className="menu-drawer"
        title=" "
        placement="left"
        width={298}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {/* <NavBar
          orientation="vertical"
          idRol={selectedRole?.idRol}
          closeMenu={() => setOpenDrawer(false)}
        /> */}
      </Drawer>
    </>
  );
}

export { Header };
