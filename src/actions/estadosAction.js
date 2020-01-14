import { MOSTRAR_ESTADOS, AGREGAR_ESTADO, EDITAR_ESTADO, BORRAR_ESTADO } from '../actions/types';
import axios from 'axios';
 
//CSS
import Swal from 'sweetalert2'
 
export const mostrarEstados = () => async dispatch => {
   const estados = await axios.get('https://roraso.herokuapp.com/Estado/Estados',
   { headers: { 'access-token': localStorage.getItem('access-token')}})
   .then(res => {

        dispatch({
            type : MOSTRAR_ESTADOS,
            payload : res.data
        })

        if(res.status === 200){
            return;
            
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar mostrar estados',
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
 
export const agregarEstado = (estado) => async dispatch => {
 
   const {descripcion, key} = estado;
 
   const data = {
       Description : descripcion,
       Key : key,
   }
 
   await axios.post("https://roraso.herokuapp.com/Estado/Create",data,
   {headers: { 'access-token': localStorage.getItem('access-token')}})
       .then(res => {
           if(res.status === 200){
               Swal.fire({
                   title: 'Correcto!',
                   text: 'Se ha añadido un nuevo estado',
                   type: 'success',
                   confirmButtonText: 'Sera Redirigido'
               })
               setTimeout(function(){
                   window.location.href = "http://localhost:3000/pedido/estados";
               }, 3500);
           }
           else if (res.status === 404){
               Swal.fire({
                   title: 'Atencion!',
                   text: 'No hay datos para mostrar',
                   type: 'warning',
               })
           }
           else{
               Swal.fire({
                   title: 'Error!',
                   text: 'Se ha producido un error al intentar crear un gasto',
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
       type: AGREGAR_ESTADO,
       payload: estado
   })
}
 
export const editarEstado = (estado) => async dispatch => {
  
   const {descripcion, key} = estado;
 
   const data = {
       Description : descripcion,
       Key : key,
   }
 
   await axios.post("https://roraso.herokuapp.com/Estado/Update",data,
   {headers: { 'access-token': localStorage.getItem('access-token')}})
       .then(res => {
           if(res.status === 200){
               Swal.fire({
                   title: 'Correcto!',
                   text: 'Se ha actualizado el estado',
                   type: 'success',
                   confirmButtonText: 'Sera Redirigido'
               })
               setTimeout(function(){
                   window.location.href = "http://localhost:3000/pedido/estados";
               }, 3500);
           }
           else{
               Swal.fire({
                   title: 'Error!',
                   text: 'Se ha producido un error al intentar actualizar un estado',
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
       type: EDITAR_ESTADO,
       payload: data
   })
  
}
 
export const eliminarEstado = (id) => async dispatch => {
   await axios.post("https://roraso.herokuapp.com/Estado/Delete",{'id': id},
   { headers: { 'access-token': localStorage.getItem('access-token')}})
       .then(res => {
           if(res.status === 200){
               Swal.fire({
                   title: 'Correcto!',
                   text: 'Se ha borrado un estado',
                   type: 'success',
                   confirmButtonText: 'Sera Redirigido'
               })
               dispatch({
                   type: BORRAR_ESTADO,
                   payload: id
               })
               setTimeout(function(){
                   window.location.href = "http://localhost:3000/pedido/estados";
               }, 3500);
           }
           else{
               Swal.fire({
                   title: 'Error!',
                   text: 'Se ha producido un error al intentar borrar un estado',
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