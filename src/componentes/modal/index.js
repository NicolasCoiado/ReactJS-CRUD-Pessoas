import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import api from '../../API/api';
import './index.css';
import M from 'materialize-css';

const Modal = ({showModal, setShowModal}) => {

    const [nome, setNome] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [DDD, setDDD] = useState('');
    const history = useHistory();
    
    useEffect(() => {
        api.post("/usuarios/requisitar", {}, {
            headers: { Authorization : 'Bearer ' + window.localStorage.getItem('token')} 
        })
        .then(res => {
            setNome(res.data.usuario.nome);
            setEstado(res.data.usuario.estado);
            setCidade(res.data.usuario.cidade);
            setTelefone(res.data.usuario.telefone);
            setDDD(res.data.usuario.ddd);

            window.localStorage.setItem('token', res.data.token)
        })
        .catch(err =>{
            console.log('Deu erro');
            console.log(err);
            window.localStorage.setItem('token', null)
        })
    }, []);

    const handleNome= (e) =>{
        console.log('***handleInputChange', e.target.value)
        setNome(e.target.value)
    }
    
    const handleEstado= (e) =>{
        setEstado(e.target.value)
    }
    const handleCidade= (e) =>{
        setCidade(e.target.value)
    }
    const handleTelefone= (e) =>{
        setTelefone(e.target.value)
    }
    const handleDDD= (e) =>{
        setDDD(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const user = {
            nome: nome,
            estado: estado,
            cidade: cidade,
            telefone: telefone,
            ddd: DDD
        } 

        api.patch("/usuarios/editar", user, {
            headers: { Authorization : 'Bearer ' + window.localStorage.getItem('token')}
        } )
        .then(res => {
            console.log("Deu bom")
            console.log(user);
            console.log(res);
            window.location.reload();
        })
        .catch(err =>{
            console.log(err)
            console.log(user)
            window.localStorage.setItem('token', null)
        })

    };
    
    /*======================================================================*/


    return <> {showModal ? 

        <div className="card">
        <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">account_circle</i>
                    <input placeholder="Nome Completo" id="nome" type="text" className="validate" onChange={handleNome} value={nome} />
                    
                </div>
            </div>

           <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">assistant_photo</i>
                    <input placeholder="Estado" id="estado" type="text" className="validate" onChange={handleEstado} value={estado} />
                </div>
           </div>

           <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">assistant_photo</i>
                    <input placeholder="Cidade" id="cidade" type="text" className="validate" onChange={handleCidade} value={cidade} />
                </div>
           </div>

           <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">security</i>
                    <input placeholder="Telefone" id="tell" type="number" className="validate" onChange={handleTelefone} value={telefone} />
                </div>
           </div>

           <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">fiber_manual_record</i>
                    <input placeholder="DDD" id="ddd" type="text" className="validate" onChange={handleDDD} value={DDD} />
                </div>
           </div>
           <div className="row">
                <div className="botao">
                    <button className="btn waves-effect waves-light" type="submit" name="action" >
                        Submit
                    </button>
                </div>
           </div>
        </form>
    </div>

    : null} </>
}

export default Modal;