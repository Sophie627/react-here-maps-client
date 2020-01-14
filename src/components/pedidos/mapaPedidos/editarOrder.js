import React, { Component } from 'react';
import axios from 'axios'
import {Navigation} from 'react-router';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
import ListadoRolesEmpleados from '../../rrhh/empleados/ListaRolEmpleado';

//CSS
import Swal from 'sweetalert2'
import '../../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { mostrarEmpleados } from '../../../actions/empleadosAction';
import { asignarDelivery } from '../../../actions/pedidosAction';

class EditarOrder extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            delivery: null,
        };
    }

    componentWillMount() {
        this.props.mostrarEmpleados();
    };

    onChangeDelivery(event) {
        event.preventDefault();
        this.setState({
            delivery: event.target.value
        });
    }

    editOrder(event) {
        event.preventDefault();
        // console.log(this.props.location.state.id);
        this.props.asignarDelivery([this.props.location.state.id, this.state.delivery]);
    }
    
    render() {
        
        const empleados = this.props.empleados;

        var empleadosTag = empleados.map((empleado, key) => (
            <option value={empleado.id} key={key} >{empleado.Name + " " + empleado.LastName}</option>
        ));

        return (
            <div>
                <Header titulo = 'Edit Order'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <div className="form-group">
                                <label>Pedido</label>
                                <input type="text" defaultValue={this.props.location.state.Order} className="form-control" disabled/>
                            </div>
                            <div className="form-group">
                                <label>Delivery</label>
                                <select className="form-control" onChange={(event) => this.onChangeDelivery(event)}>
                                    <option value="0"></option>
                                    {empleadosTag}
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="button" value="Enviar" className="btn btn-primary" onClick={(event) => this.editOrder(event)}/>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    line: state.pedidos.line,
    empleados: state.empleados.empleados,
})

export default connect(mapStateToProps, {
    asignarDelivery,
    mostrarEmpleados,
})(EditarOrder);