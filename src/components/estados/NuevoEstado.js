import React, { Component } from 'react';
import axios from 'axios';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { agregarEstado } from '../../actions/estadosAction';

//CSS
import Swal from 'sweetalert2'
import '../../assets/css/empleados/form-alta-empleados.css';

class NuevoEstado extends Component {

    state = {
        // currentUser : ''
    }

    descripcionRef = React.createRef();
    keyRef = React.createRef();

    agregarEstado = (e) => {
        e.preventDefault();

        const estado = {
        descripcion : this.descripcionRef.current.value,
        key : this.keyRef.current.value,
        }

        this.props.agregarEstado(estado);

        e.currentTarget.reset();
    }

    render() {
        return (
            
        <React.Fragment>
            <Header titulo = 'Alta de Estado'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.agregarEstado} className="col-5">
                        <div className="form-group">
                            <label>Descripcion</label>
                            <input ref={this.descripcionRef} placeholder="En Preparacion" type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Key</label>
                            <input ref={this.keyRef} type="text" placeholder="P" className="form-control" required/>
                        </div>
                        <div center="true" align="center" className="form-group">
                            <input type="submit" value="Enviar" className="btn btn-primary" required/>
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    estados : state.estados.estados
});

export default connect(mapStateToProps, { agregarEstado })(NuevoEstado);