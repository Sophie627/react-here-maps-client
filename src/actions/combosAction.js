import { MOSTRAR_COMBOS, AGREGAR_COMBO, EDITAR_COMBO, BORRAR_COMBO } from '../actions/types';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

export const mostrarCombos = () => async dispatch => {
    const combos = await axios.get('https://roraso.herokuapp.com/Offerts/Offerts',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {

        dispatch({
            type : MOSTRAR_COMBOS,
            payload :  res.data
        })

        // console.log(res.status)
        if(res.status === 200){
            return;
            
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar mostrar combos',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }
    })
    .catch(err => {

        console.log(combos)

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
        }else{
            const serializedCombo = localStorage.getItem('combos');
            let deserializedCombos;

            deserializedCombos = JSON.parse(serializedCombo);
            
            dispatch({
                type : MOSTRAR_COMBOS,
                payload : deserializedCombos
            })
        }
    })

    
}

export const agregarCombo = (combo) => async dispatch => {

    const {nombre, descripcion, monto, producto} = combo;

    const data = {
        Combo : {
            Name : nombre,
            Description : descripcion,
            Amount : monto ,
            ProductosPorCombo : producto
        }
    }

    // console.log(data);

    await axios.post("https://roraso.herokuapp.com/Offerts/Create",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo combo',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/combos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar crear el combo',
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
        type: AGREGAR_COMBO,
        payload: combo
    })
}


export const editarCombo = (combo) => async dispatch => {
    


    const {id, nombre, descripcion, monto, productos} = combo;

    const data = {
        Combo : {
            Name : nombre,
            Description : descripcion,
            Amount : monto,
            id : id
        },
        Products : productos
    }

    console.log(data)

    await axios.post("https://roraso.herokuapp.com/Offerts/Update",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){
            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha editado un combo',
                type: 'success',
                confirmButtonText: 'Sera Redirigido'
            })
            setTimeout(function(){ 
                window.history.back();
            }, 3500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar editar el combo',
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
    
    dispatch({
    type : EDITAR_COMBO,
    payload : combo
    })
    
}

export const eliminarCombo = (id) => async dispatch => {
    await axios.post("https://roraso.herokuapp.com/Offerts/Delete",{'id': id},
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado un combo',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/combos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar el combo',
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
        type: BORRAR_COMBO,
        payload: id
    })
}