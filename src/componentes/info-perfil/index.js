import React, { Fragment, useState, useEffect} from "react";
import api from "../../API/api";
import Modal from "../modal/";
import DropImage from "../drop-image";
import M from 'materialize-css';
import Viewer from '../viewer-img';
import './index.css';

function Info (){
    const [user, setUser] = useState('');
    console.log(window.localStorage.getItem('token'))

    useEffect(() => {
        api.post("/usuarios/requisitar", {}, {
            headers: { Authorization : 'Bearer ' + window.localStorage.getItem('token')} 
        })
        .then(res => {
            setUser(res.data.usuario);
            window.localStorage.setItem('token', res.data.token)
        })
        .catch(err =>{
            console.log('Deu erro');
            console.log(err);
            window.localStorage.setItem('token', null)
        })
    }, []);
        
    const [showModal, setShowModal]= useState(false);
    const OpenModal = () => {
        setShowModal(prev => !prev);
    }
    
    return(
        <Fragment>
            <Viewer />
            <DropImage />

            <p><b>Nome:</b> {user.nome}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Celular:</b> ({user.ddd}){user.telefone}</p>
            <p><b>Estado:</b> {user.estado}</p>
            <p><b>Cidade:</b> {user.cidade}</p>

            <button  onClick={OpenModal} id="btn-editar" className="btn-floating btn-large waves-effect waves-light green">
                    <i className="material-icons">create</i>
            </button >

            <Modal showModal={showModal} setShowModal={setShowModal} />
        </Fragment>
    );

}

export default Info;