import { MOSTRAR_CATEGORIAS, MOSTRAR_CATEGORIA, AGREGAR_CATEGORIA, EDITAR_CATEGORIA, BORRAR_CATEGORIA } from './types';
import axios from 'axios';

// CSS
import Swal from 'sweetalert2'

export const mostrarCategorias = () => async dispatch => {
    const categorias = await axios.get('https://roraso.herokuapp.com/Category/Categories',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {

        dispatch({
            type : MOSTRAR_CATEGORIAS,
            payload : res.data
        })

        if(res.status === 200){
            return;
            
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar mostrar categorias',
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
        }else{
            const serializedCategory = localStorage.getItem('categorias');
            let deserializedCategory;

            deserializedCategory = JSON.parse(serializedCategory);
            
            dispatch({
                type : MOSTRAR_CATEGORIAS,
                payload : deserializedCategory
            })
        }
    })
}

export const mostrarCategoria = (id) => async dispatch => {
    const categoria = await axios.get(`https://roraso.herokuapp.com/Category/Category?id=${id}`,
    { headers: { 'access-token': localStorage.getItem('access-token')}})


    dispatch({
        type: MOSTRAR_CATEGORIA,
        payload: categoria.data
    });
}

export const agregarCategoria = (categoria) => async dispatch => {

    // console.log(empleado);
    const {Name, Description} = categoria;

    const data = {
        Name : Name,
        Description : Description
    }
    await axios.post("https://roraso.herokuapp.com/Category/CreateCategory",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){

            dispatch({
                type: AGREGAR_CATEGORIA,
                payload: categoria
            })

            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha añadido una nueva categoria',
                type: 'success',
                // confirmButtonText: 'Sera Redirigido'
            })
            setTimeout(function(){ 
                window.location.href = "http://localhost:3000/modulo";
            }, 3500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar crear la categoria',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }
        
    })
    .catch(err => {
        Swal.fire({
            title: 'Atencion!',
            text: 'La solicitud fue guardada en la bandeja se enviara una vez se restablezca la conexion',
            type: 'warning',
            confirmButtonText: 'Ok'
        })

        if(localStorage.getItem('enviarCat').length > 0){

            let obtenerCategoriasAEnviar = localStorage.getItem('enviarCat');
            
            let deserializarCategoriaAEnviar 

            deserializarCategoriaAEnviar = JSON.parse(obtenerCategoriasAEnviar);

            deserializarCategoriaAEnviar.push(categoria);
            
            localStorage.setItem('enviarCat', JSON.stringify(deserializarCategoriaAEnviar))
        }
        else{
            localStorage.setItem('enviarCat', JSON.stringify(categoria))
        }

        let serializedCategory = localStorage.getItem('categorias');

        let deserializedCategory;

        deserializedCategory = JSON.parse(serializedCategory);
        
        deserializedCategory.push(categoria);

        localStorage.setItem('categorias', JSON.stringify(deserializedCategory))

        // dispatch({
        //     type : AGREGAR_CATEGORIA,
        //     payload : deserializedCategory
        // })

        return;
    })
}

export const eliminarCategoria = (id) => async dispatch => {
    await axios.post("https://roraso.herokuapp.com/Category/DeleteCategory",{'id': id},
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado una categoria',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000//modulo";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar la categoria',
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
        type: BORRAR_CATEGORIA,
        payload: id
    })
}

export const editarCategoria = (categoria) => async dispatch => {
    // console.log(empleado);
    const {name, description, id} = categoria;

    const data = {
        Categoria : {
            id : id,
            Name : name,
            Description : description
        }
    }

    await axios.post("https://roraso.herokuapp.com/Category/UpdateCategory",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){
            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha actualizado una categoria',
                type: 'success',
                confirmButtonText: 'Sera Redirigido'
            })
            setTimeout(function(){ 
                window.location.href = "http://localhost:3000/modulo";
            }, 2500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar actualizar la categoria',
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
        type: EDITAR_CATEGORIA,
        payload: categoria
    })
}