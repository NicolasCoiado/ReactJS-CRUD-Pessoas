import React, { Fragment, useEffect, useState } from "react";
import {Link, useHistory } from "react-router-dom";
import api from '../../API/api';
import M from 'materialize-css';

function Header (){ 
  const history = useHistory();
  
  const [logado, setLogado] = useState('false');

  function logoff(){
      localStorage.setItem('token', null)
      history.push('/login')
  }
  useEffect(() => {
    api.post("/verifytoken", {}, {
      headers: { Authorization : 'Bearer ' + window.localStorage.getItem('token')}
      
      })
      .then(res => {
         console.log(res);
         setLogado('true');
      })
      .catch(err =>{
         console.log(err);
         setLogado('false');
      })
  
  }, []);

  return(
    <header>
      <nav>
        <div className="nav-wrapper deep-purple darken-4">
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            { 
              logado==='true'
                ? <Fragment>
                    <li><Link className="perfil" to='/myprofile'>perfil</Link></li>
                    <li onClick={logoff}>logoff</li>
                  </Fragment>
                :<li><Link className="login" to='/login'>login</Link></li>
            }
          </ul>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link className="home" to='/'>HOME</Link></li>
            <li><Link className="cadastro" to='/cadastro'>CADASTRO</Link></li>
          </ul>
          
        </div>
      </nav>
    </header>
  );
}
export default Header; 