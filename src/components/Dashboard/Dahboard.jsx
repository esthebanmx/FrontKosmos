/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { no_auth } from '../../reducers/auth-reducer';

function Dashboard() {
    // const authenticated = useSelector((state) => state.auth.authenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/");
        dispatch(no_auth());
    };

    return (
        <>
            <h2>Dashboard</h2>
            {/* <button onClick={onClick}>Cerrar sesión</button> */}
        </>
    );
}

export default Dashboard;
