import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { editarEstado } from '../../actions/estadosAction';

class EditarEstado extends Component {

  state = {
    // date : ''
  }

  descripcionRef = React.createRef();
  keyRef = React.createRef();

  editarEstado = (e) => {
    e.preventDefault();

    if(this.descripcionRef.current.value == undefined || this.descripcionRef.current.value == null ||
        this.keyRef.current.value == undefined || this.keyRef.current.value == null){
        Swal.fire({
            title: 'Error!',
            text: 'Hay datos erroneos en el formulario',
            type: 'error',
            confirmButtonText: 'Reintentar'
        })
        return;
    }else{
        const estado = {
        id : this.props.location.state.id,
        descripcion : this.descripcionRef.current.value,
        key : this.keyRef.current.value,
        }

        // console.log(gasto);
        this.props.editarEstado(estado);
    }
  }

    render() {
        return (
            <div>
                <Header titulo = 'Editar Estado'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form onSubmit={this.editarGasto} className="col-8">
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input ref={this.descripcionRef} type="text" defaultValue={this.props.location.state.Description} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Key</label>
                                    <input ref={this.keyRef} type="text" defaultValue={this.props.location.state.Key} className="form-control" required/>
                                </div>
                                <div center="true" align="center" className="form-group">
                                    <input type="submit" value="Enviar" className="btn btn-primary" required/>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default connect(null, { editarEstado })(EditarEstado);