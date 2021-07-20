import React, {useState} from "react";
import api from "../../API/api"
import { useHistory } from "react-router-dom";
import M from 'materialize-css';
import './index.css';

export default function FormCadastro (){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [telefone, setTelefone] = useState('');
    const [DDD, setDDD] = useState('');
    const history = useHistory();

    const handleNome= (e) =>{
        console.log('***handleInputChange', e.target.value)
        setNome(e.target.value)
    }
    const handleEmail= (e) =>{
        setEmail(e.target.value)
    }
    const handleSenha= (e) =>{
        setSenha(e.target.value)
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
            email: email,
            senha: senha,
            estado: estado,
            cidade: cidade,
            telefone: telefone,
            ddd: DDD
        } 

        api.post("/usuarios/cadastrar", user )
        .then(res => {
            console.log("Deu bom")
            console.log(user);
            console.log(res);
            history.push("/login");
        })
        .catch(err =>{
            console.log(err)
            console.log(user)
            window.localStorage.setItem('token', null)
        })

    };
    return(
        
    <div className="cadastrar-card">   
        <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="nome" type="text" className="validate" onChange={handleNome} value={nome} />
                        <label for="nome">Nome Completo</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">local_post_office</i>
                        <input id="email" type="email" className="validate" onChange={handleEmail} value={email} />
                        <label for="email">Email</label>
                    </div>
               </div>

               <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">security</i>
                        <input id="password" type="password" className="validate" onChange={handleSenha} value={senha} />
                        <label for="password">Senha</label>
                    </div>
               </div>

               <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">assistant_photo</i>
                        <input id="estado" type="text" className="validate" onChange={handleEstado} value={estado}/>
                        <label for="estado">Estado</label>
                    </div>
               </div>

               <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">assistant_photo</i>
                        <input id="cidade" type="text" className="validate" onChange={handleCidade} value={cidade}/>
                        <label for="cidade">Cidade</label>
                    </div>
               </div>

               <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">security</i>
                        <input id="tell" type="number" className="validate" onChange={handleTelefone} value={telefone} />
                        <label for="tell">Telefone</label>
                    </div>
               </div>

               <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">fiber_manual_record</i>
                        <input id="ddd" type="text" className="validate" onChange={handleDDD} value={DDD}/>
                        <label for="ddd">DDD</label>
                    </div>
               </div>
               <div className="row">
                    <div className="cadastrar-botao">
                        <button className="btn waves-effect waves-light" type="submit" name="action" >
                            Submit
                        </button>
                    </div>
               </div>
            </form>
        </div>
    </div>
    
    );
}

