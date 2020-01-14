import { MOSTRAR_EMPLEADOS, MOSTRAR_EMPLEADO, AGREGAR_EMPLEADO, EDITAR_EMPLEADO, 
    BORRAR_EMPLEADO} from './types';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

// export const getEmpleados = () => { //El middleware conecta los actions con los reducers
//     return {
//         type : MOSTRAR_EMPLEADOS
//     }
// }

export const mostrarEmpleados = () => async dispatch => {
    const user = await axios.get('https://roraso.herokuapp.com/User/users',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {

        dispatch({
            type : MOSTRAR_EMPLEADOS,
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
        }
    })

}

export const mostrarEmpleado = (id) => async dispatch => {
    const user = await axios.get(`https://roraso.herokuapp.com/User/user?id=${id}`,
    { headers: { 'access-token': localStorage.getItem('access-token')}})


    dispatch({
        type: MOSTRAR_EMPLEADO,
        payload: user.data
    });
}

export const eliminarEmpleado = (id) => async dispatch => {
    await axios.patch("https://roraso.herokuapp.com/User/DeleteUser",{'id': id},
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado un empleado',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/rrhh/empleados";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar el empleado',
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
        type: BORRAR_EMPLEADO,
        payload: id
    })
}

export const agregarEmpleado = (empleado) => async dispatch => {

    // console.log(empleado);
    const {dni, nombre, apellido, email, rol, primerTelefono, 
        segundoTelefono} = empleado;
        
    const user = {
        Dni : dni,
        Password : dni,
        Name : nombre,
        LastName : apellido,
        Email : email,
        Rols : rol,
        PrimaryPhone : primerTelefono,
        SecondaryPhone : segundoTelefono,  
    }

    const data = {
        User : user,
    }

    await axios.post("https://roraso.herokuapp.com/User/CreateUser",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){
            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha añadido un nuevo empleado',
                type: 'success',
                confirmButtonText: 'Sera Redirigido'
            })
            setTimeout(function(){ 
                window.location.href = "http://localhost:3000/rrhh/empleados";
            }, 3500);
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Se ha producido un error al intentar crear el empleado',
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
        type: AGREGAR_EMPLEADO,
        payload: empleado
    })
}

export const editarEmpleado = (empleado) => async dispatch => {
    


    const {id, dni, nombre, apellido, email, rol, primerTelefono, 
        segundoTelefono} = empleado;

    const data = {
        User : {
            id : id,
            Dni : dni,
            Password : dni,
            Name : nombre,
            LastName : apellido,
            Email : email,
            Rols : rol,
            PrimaryPhone : primerTelefono,
            SecondaryPhone : segundoTelefono,
        }
    }

    console.log(data);

    await axios.put("https://roraso.herokuapp.com/User/UpdateUser",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
        if(res.status === 200){
            Swal.fire({
                title: 'Correcto!',
                text: 'Se ha editado un empleado',
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
                text: 'Se ha producido un error al intentar editar el empleado',
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
    type : EDITAR_EMPLEADO,
    payload : empleado
    })
    
}

export const agregarDireccion = direccionUser => async dispatch => {

    const {userid, direccion, departamento, piso, codigoPostal, LatLong} = direccionUser;

    const data = {
        Address : {
            Adress : direccion,
            Department : departamento, 
            Floor : piso,
            Cp : codigoPostal,
            LatLong : LatLong,
            User : userid
        }
    }

    console.log(data);

    // await axios.post("https://roraso.herokuapp.com/User/AddAddress",data,
    // {headers: { 'access-token': localStorage.getItem('access-token')}})
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
}
