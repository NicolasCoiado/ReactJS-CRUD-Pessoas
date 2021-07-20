import React, {useState} from "react";
import api from "../../API/api";
import { useHistory } from "react-router-dom";
import M from 'materialize-css';
import './index.css';

export default function FormLogin(){

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleEmail= (e) =>{
        setEmail(e.target.value)
    }
    const handleSenha= (e) =>{
        setSenha(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const user = {
            email: email,
            senha: senha,
        } 

        api.post("/usuarios/auth", user )
        .then(res => {
            const Token = res.data.token;
            console.log(res.data);
            window.localStorage.setItem('token', Token);
            console.log(window.localStorage.getItem('token'));
            history.push('/');
        })
        .catch(err =>{
            console.log('Deu erro');
            history.push('/');
            window.alert('Usuário não cadastrado')
            window.localStorage.setItem('token', null)
        })
    };
    return(
        <div className="form-geral">
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" onChange={handleEmail} value={email} />
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="senha" type="password" className="validate"  onChange={handleSenha} value={senha} />
                            <label for="senha">Senha</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="botao">
                            <button className="btn waves-effect waves-light" type="submit" name="action" >
                                LOGAR
                            </button>
                        </div>
                   </div>
                </form>
            </div>
        </div>
    );
}