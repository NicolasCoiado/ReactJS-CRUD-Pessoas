import React, {useEffect, useState} from 'react';
import './index.css'
import api from '../../API/api'
function Viewer () {

    const [foto, setFoto] = useState(undefined);
    const [bgimg, setBgimg] = useState({});
    useEffect(() => { 
    
        api.post("/usuarios/requisitar/foto", {}, {
            headers: { Authorization : 'Bearer ' + window.localStorage.getItem('token')} 
        })
        .then(res => {
            setFoto(res.data.foto);
            console.log(res.data)
            window.localStorage.setItem('token', res.data.token)
            if(res.data.foto){
                console.log(res.data.foto)
                var fotoRaw = res.data.foto
                var imgUrl = fotoRaw.substring(0,7) + "/" + fotoRaw.split("\\")[1]

                console.log(imgUrl)
                
                setBgimg({backgroundImage: `url('https://apitestelogin.herokuapp.com/${imgUrl}')`})

            }

        })
        .catch(err =>{
            console.log('Deu erro');
            console.log(err);
            window.localStorage.setItem('token', null)
        })
    }, []);
    return(
        <div id="imagem" style={bgimg}>
        </div>
    );
} 

export default Viewer;