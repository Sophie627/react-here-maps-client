import { MOSTRAR_GASTOS, MOSTRAR_GASTO, AGREGAR_GASTO, EDITAR_GASTO, BORRAR_GASTO } from '../actions/types';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

export const mostrarGastos = () => async dispatch => {
    const gastos = await axios.get('https://roraso.herokuapp.com/Gasto/Expenses',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {

        dispatch({
            type : MOSTRAR_GASTOS,
            payload : res.data
        })

        if(res.status === 200){
            return;
            
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar mostrar gastos',
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
                    text: `No posee los permisos necesarios`,
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                localStorage.removeItem("access-token");
                setTimeout(function(){ 
                    return window.location.replace("/login");
                }, 3000);
                
            }
        }
    })
}

export const agregarGasto = (gasto) => async dispatch => {

    const {details, amount, date, user} = gasto;

    const data = {
        Details : details,
        Amount : amount,
        Date : date,
        User : user
    }

    await axios.post("https://roraso.herokuapp.com/Gasto/Create",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200 || res.status === 500){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo gasto',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/gastos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar crear el gasto',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'El Servidor no ha respondido la solicitud',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        })

    dispatch({
        type: AGREGAR_GASTO,
        payload: gasto
    })
}

export const editarGasto = (gasto) => async dispatch => {
    
    const {id, details, amount, date, idUser} = gasto;

    const data = {

        id : id,
        Gasto : {
            Details : details,
            Amount : amount,
            Date : date,
            User : idUser
        }

    }

    await axios.post("https://roraso.herokuapp.com/Gasto/Update",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha actualizado el gasto',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/gastos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar actualizar un gasto',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'El Servidor no ha respondido la solicitud',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        })

    dispatch({
        type: EDITAR_GASTO,
        payload: data
    })
    
}

export const eliminarGasto = (id) => async dispatch => {
    await axios.post("https://roraso.herokuapp.com/Gasto/Delete",{'id': id},
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado un gasto',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                dispatch({
                    type: BORRAR_GASTO,
                    payload: id
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/gastos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar un gasto',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
            
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'El Servidor no ha respondido la solicitud',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        })

}