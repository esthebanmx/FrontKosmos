import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthRequired () {
    const isAuthenticated = useSelector((state) => state.authenticated);
    return (
        isAuthenticated ? (
            <Outlet />
        ) : <Navigate to="/" />
    );
}

export default AuthRequired;
