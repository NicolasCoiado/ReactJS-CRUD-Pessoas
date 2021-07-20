import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../paginas/home/'
import Cadastro from '../paginas/cadastro/'
import Login from '../paginas/login/'
import Perfil from "../paginas/perfil";

const Rotas = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/cadastro' component={Cadastro} />
            <Route path='/login' component={Login} />
            <Route path='/myprofile' component={Perfil} />
        </Switch>
    </BrowserRouter>
);

export default Rotas;