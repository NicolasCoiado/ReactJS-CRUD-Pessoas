import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../componentes/header/'
import Tabela from '../../componentes/tabela/'

export default function Home () {
    return(
      <div>
        <Header />
        <Tabela />
      </div>
    );
}