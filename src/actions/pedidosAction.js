import { MOSTRAR_PEDIDOS, MOSTRAR_PEDIDO, AGREGAR_PEDIDO, EDITAR_PEDIDO, BORRAR_PEDIDO, ASIGNAR_DELIVERY } from '../actions/types';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

export const mostrarPedidos = () => async dispatch => {
    const pedidos = await axios.get('https://roraso.herokuapp.com/Pedido/Pedidos',
    { headers: { 'access-token': localStorage.getItem('access-token')}});

    // console.log(turnos.data);

    dispatch({
        type : MOSTRAR_PEDIDOS,
        payload : pedidos.data
    })
}

export const eliminarPedido = (id) => async dispatch => {
    await axios.post("https://roraso.herokuapp.com/Pedido/Delete", {
                'id': id
            },
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado un turno',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/pedidos";
                }, 1500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar el turno',
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
        type: BORRAR_PEDIDO,
        payload: id
    })
}

export const agregarPedido = (pedido) => async dispatch => {

    const {date, user, amount, state, combo, client, product, address} = pedido;

    const data = {
        Date : date,
        Users : user,
        Amount : amount,
        State : state,
        Clients : client,
        CombosPorPedido : combo,
        ProductosPorPedido : product,
        Adress : address
    }

    console.log(data)

    await axios.post("https://roraso.herokuapp.com/Pedido/Create",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200 || res.status === 500){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo pedido',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/pedidos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar crear el pedido',
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
        type: AGREGAR_PEDIDO,
        payload: pedido
    })
}

export const editarPedido = (pedido) => async dispatch => {

    const {id, date, user, amount, state, combo, client, product, address} = pedido;

    const data = {
        id : id,
        Date : date,
        Users : user,
        Amount : amount,
        State : state,
        Clients : client,
        CombosPorPedido : combo,
        ProductosPorPedido : product,
        Adress : address
    }

    console.log(data)

    await axios.post("https://roraso.herokuapp.com/Pedido/Update",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200 || res.status === 500){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo pedido',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/pedidos";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar crear el pedido',
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
        type: EDITAR_PEDIDO,
        payload: pedido
    })
}

export const asignarDelivery = (line) => async dispatch => {

    const data = {
        "Delivery": {
            "id": Number(line[1])
        },
        "Pedido": {
            "id": line[0]
        }
    }
    console.log(data);
    await axios.post("https://roraso.herokuapp.com/Pedido/Asignar", data, {
            headers: {
                'access-token': localStorage.getItem('access-token')
            }
        })
        .then(res => {
            if (res.status === 200 || res.status === 500) {
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha añadido un nuevo pedido',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function () {
                    window.location.href = "https://roraso.herokuapp.com/mapa";
                }, 1500);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar crear el pedido',
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
        type: ASIGNAR_DELIVERY,
        payload: line,
    })
}


// export const editarRol = (rol) => async dispatch => {
    
//     const {id, nombre, descripcion, permisos} = rol;

    /*await axios.post("https://roraso.herokuapp.com/Pedido/", data, {
        headers: {
            'access-token': localStorage.getItem('access-token')
        }
    })*/

//     const data = {
//         rol : {
//             id : id,
//             Name : nombre,
//             Description : descripcion,
//         },
//         Authorizations : permisos
//     }

//     console.log(data);

//     dispatch({
//         type: EDITAR_ROL,
//         payload: rol
//     })
    
// }