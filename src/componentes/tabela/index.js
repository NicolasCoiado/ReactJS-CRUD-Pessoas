import React, {useEffect, useState}from 'react';
import M from 'materialize-css';
import api from '../../API/api';
import { SCOPABLE_TYPES } from '@babel/types';

function Tabela () {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    api.post("/usuarios", {}, {
        headers: { Authorization : 'Bearer ' + window.localStorage.getItem('token')} 
    })
    .then(res => {
      console.log(res.data)
        setUsers(res.data.users)
        window.localStorage.setItem('token', res.data.token)
    })
    .catch(err =>{
       
    })
  }, []);

  function handleDelete(e, id) {

    if(window.confirm("dejesa mesmo apagar esse usuário?")) {
      api.post("/usuarios/deletarUsuario", {
        id: id
      }, {
        headers: { Authorization : 'Bearer ' + window.localStorage.getItem('token')} 
      })
      .then(res => {
        window.localStorage.setItem('token', res.data.token)
        window.location.reload();
    
      })
      .catch(err =>{
      
      })
    }

 
  }

  return(
    <table>
        <thead>
          <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Telefone</th>
              <th>Excluir</th>
  
          </tr>
        </thead>

        <tbody>
          {users.map(
            users => (
              <tr key={users._id} >
                <td> {users.nome} </td>
                <td> {users.email} </td>
                <td> {users.tipo} </td>
                <td> {users.estado} </td>
                <td> {users.cidade} </td>
                <td> {`(${users.ddd}) ${users.telefone}`} </td>
                <td> <button onClick={(e)=>(handleDelete(e, users._id))} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">delete_forever</i></button></td>
              </tr>
            )
          )}
        </tbody>
      </table>
  );
}
export default Tabela;