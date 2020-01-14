import React, { Component } from 'react';
import axios from 'axios'
import {Navigation} from 'react-router';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
import ListadoRolesEmpleados from './ListaRolEmpleado';

//CSS
import Swal from 'sweetalert2'
import '../../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { editarEmpleado } from '../../../actions/empleadosAction'

class EditarEmpleado extends Component {

    state = {
        rol : '',
        roles : [],
        error : false
    }


    componentDidMount(){

        const rol = parseInt(this.props.location.state.Rols);

        // if(rol == 1){
        //     this.setState({
        //         rol: 'Admin'
        //     }); 
        //     return;
        // }
        // else if (rol == 2){
        //     this.setState({
        //         rol: 'Usuario'
        //     });
        // }
    }

    dniRef = React.createRef();
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    emailRef = React.createRef();
    primerTelefonoRef = React.createRef();
    segundoTelefonoRef = React.createRef();
    rolRef = React.createRef();

    componentWillMount(){

        var accessToken =  localStorage.getItem('access-token');
        
        axios.get('https://roraso.herokuapp.com/Rol/rols', {headers: {'access-token': accessToken}})
            .then(res => {
                if(res.data.length === 0){
                    return null;
                }else{
                    this.setState({
                        roles : res.data
                    })
                    // const rolEmpleado = this.state.roles;
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    crearEmpleado = (e) => {

        e.preventDefault();

        const empleado = {
            id : this.props.location.state.id,
            dni : this.dniRef.current.value,
            nombre : this.nombreRef.current.value,
            apellido : this.apellidoRef.current.value,
            email : this.emailRef.current.value,
            primerTelefono : this.primerTelefonoRef.current.value,
            segundoTelefono : this.segundoTelefonoRef.current.value,
            rol : this.rolRef.current.value,
        }



        if(Number(empleado.dni) === 'NaN' || empleado.dni === '' || empleado.nombre === '' || empleado.apellido === '' 
        || empleado.email === '' || empleado.primerTelefono === '' ){
            // console.log('error');
            this.setState({error : true});
            Swal.fire({
                title: 'Error!',
                text: 'Faltan o hay errores en el formulario',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }else{
            this.setState({error : false});
            this.props.editarEmpleado(empleado)
        }

        // e.currentTarget.reset();

        // console.log(empleado);
    }

    render() {
        
        if(this.props.rol == "undefinded") return null;

        console.log(this.props);

        return (
            <div>
                <Header titulo = 'Alta de Empleado'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form onSubmit={this.crearEmpleado} className="col-8">
                                <div className="form-group">
                                    <label>DNI</label>
                                    <input ref={this.dniRef} type="text" defaultValue={this.props.location.state.Dni} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input ref={this.nombreRef} type="text" defaultValue={this.props.location.state.Name} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Apellido</label>
                                    <input ref={this.apellidoRef} type="text" defaultValue={this.props.location.state.LastName} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref={this.emailRef} type="email" defaultValue={this.props.location.state.Email} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>1º Telefono / Celular</label>
                                    <input ref={this.primerTelefonoRef} type="text" defaultValue={this.props.location.state.PrimaryPhone} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>2º Telefono / Celular</label>
                                    <input ref={this.segundoTelefonoRef} type="text" defaultValue={this.props.location.state.SecondaryPhone} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <select ref={this.rolRef} className="form-control">
                                        <option value={this.props.location.state.Rols}>{this.state.rol}</option>
                                        
                                        {this.state.roles.map(rol => (
                                            <ListadoRolesEmpleados
                                                key = {rol.id}
                                                roles = {rol}
                                            />
                                        ))}

                                        
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Enviar" className="btn btn-primary"/>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    empleado : state.empleados.empleado
})

export default connect(mapStateToProps, {editarEmpleado})(EditarEmpleado);