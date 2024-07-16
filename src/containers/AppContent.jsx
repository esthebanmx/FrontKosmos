import React from 'react';
import { Routes, Route } from 'react-router-dom';

import * as routes from '../constants/routes';
import Home from '../components/Home/Home';
import NotFound from '../components/NotFound/NotFound';
import Dashboard from '../components/Dashboard/Dahboard';
import AuthRequired from '../components/AuthRequired/AuthRequired';
import BandejaMedicos from '../components/Medicos/BandejaMedicos';
import BandejaConsultorios from '../components/Consultorios/BandejaConsultorios';
import BandejaCitas from '../components/Citas/BandejaCitas';

function Content() {
    return (
        <Routes>
            <Route path={routes.Home} element={<Home/>} />
            <Route element={<AuthRequired />}>
                <Route path={routes.Dashboard} element={<Dashboard/>} />
                <Route path={routes.Medicos} exact element={<BandejaMedicos />} />
                <Route path={routes.Consultorios} exact element={<BandejaConsultorios />} />
                <Route path={routes.Citas} exact element={<BandejaCitas />} />
            </Route>
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

export default Content;