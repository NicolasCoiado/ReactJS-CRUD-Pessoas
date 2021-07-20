import React, { Fragment, useState, useEffect } from 'react';
import api from "../../API/api";
import FormData from 'form-data'

    function DropImage (){
    
    const [user, setUser] = useState('');
    //const [image, setImage] = useState('')
   let image = null
    const [myForm, setMyform ] = useState(document.getElementById('myForm'))

    console.log(window.localStorage.getItem('token'))
    
    const handleUpload= (e) => {
        e.preventDefault()
        // this.image = e.target.files[0]
        //setImage(JSON.stringify(e.target.files[0]))
        image = e.target.files[0]
        console.log("e::::::::::::")
        console.log(image)
    };
   
    function uploadImage(e){      
        e.preventDefault()

        console.log("imagem::::::::")
        console.log(image)

        let data = new FormData();
        data.append('img', image, image.name);

        console.log(data)

        api.patch("/usuarios/alterarFoto", data, {
            headers: {
                 'Authorization' : 'Bearer ' + window.localStorage.getItem('token'), 
                 'Content-Type': `multipart/form-data`
                 
                } 
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err =>{
            console.log('Deu erro');
        
         }) 
    }
        return(
           <Fragment>
            <br/>
            <div className="content">
                <form id="myForm" onSubmit={uploadImage}>
                    <input id="files" type="file" name="files" onChange={handleUpload}/>
                    <br />
                    <br />
                        <button type="submit" name="upload">
                            Upload
                        </button>
                </form>
            </div>
            </Fragment>
        );
    }

export default DropImage;   