import React, { Component } from 'react';
import axios from 'axios'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
// import ListadoRolesEmpleados from './ListaRolEmpleado';

//CSS
import Swal from 'sweetalert2'
import '../../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { editarCategoria } from '../../../actions/categoriasAction'

class EditarCategoria extends Component {

    state = {
        error : false
    }

    nombreRef = React.createRef();
    descripcionRef = React.createRef();

    editarCategoria = (e) => {

        e.preventDefault();

        const categoria = {
            id : this.props.location.state.id,
            name : this.nombreRef.current.value,
            description : this.descripcionRef.current.value,
        }

        console.log(categoria);

        if(categoria.name === '' || categoria.description === ''){
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
            this.props.editarCategoria(categoria)
            // this.props.agregarEmpleado(empleado);
        }

        e.currentTarget.reset();

        // console.log(empleado);
    }

    render() {
        
        if(this.props.categoria == "undefinded") return null;

        return (
            <div>
                <Header titulo = 'Editar de Categoria'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form onSubmit={this.editarCategoria} className="col-8">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input ref={this.nombreRef} type="text" defaultValue={this.props.location.state.Name} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input ref={this.descripcionRef} type="text" defaultValue={this.props.location.state.Description} className="form-control" required/>
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
    categoria : state.categorias.categoria
})

export default connect(mapStateToProps, {editarCategoria})(EditarCategoria);