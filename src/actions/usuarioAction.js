import { LOGIN_USER, FETCH_CURRENT_USER, MOSTRAR_CURRENT_USER } from '../actions/types';
import axios from 'axios';

/*Importo Views*/
import React from 'react';
// import App from '../App';
// import Routes from '../Routes';

//CSS
import Swal from 'sweetalert2'

export const loginUser = (usuario) => async dispatch => {

    const {Dni, Password} = usuario

    // const Pass = parseInt(Password);

    const user = {
        "Dni" : Dni,
        "Password" : Password
    }

    // console.log(user)

    const loginRes = await axios.post("https://roraso.herokuapp.com/User/login",user)

    
    // console.log(this.props);

    .then(res => {
        if(res.status === 200){
            localStorage.setItem('access-token', res.data.token);

            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha validado exitosamente',
                type: 'success',
                confirmButtonText: 'Sera Redirigido'
            })
            setTimeout(function(){ 
                window.location.href = "/";
            }, 3500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar iniciar sesion',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }
        
    })
    .catch(err => {
        if(err.response){
            
            if(err.response.status === 404){
                Swal.fire({
                    title: 'Error!',
                    text: `${err.response.data}`,
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
            if(err.response.status === 401){
                Swal.fire({
                    title: 'Error!',
                    text: `Se han ingresado datos erroneos`,
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
            }
        }
    })

    console.log(loginRes);

    dispatch({
        type : LOGIN_USER,
        payload : usuario
    })
}

export const fetchCurrentUser = () => async dispatch => {

     const user = await axios.get("https://roraso.herokuapp.com/User/CurrentUser",
     { headers: { 'access-token': localStorage.getItem('access-token')}});
     
     dispatch({
         type: FETCH_CURRENT_USER, 
         payload: user.data
     });
 
 }

 export const currentUser = () => async dispatch => {
    const currentUser = await axios.get('https://roraso.herokuapp.com/Auth/Authorizations',
    { headers: { 'access-token': localStorage.getItem('access-token')}});

    dispatch({
        type : MOSTRAR_CURRENT_USER,
        payload : currentUser.data
    })
}