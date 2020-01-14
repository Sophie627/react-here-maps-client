import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarEmpleado } from '../../../actions/empleadosAction'

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

const tableStyle = {
    marginTop: 20,
    maxWidth: '100%',
    minWidth: '100%'
}

class Empleado extends Component {

    eliminarEmpleado = () =>{
        const {id} = this.props.info;

        this.props.eliminarEmpleado(id);
    }
    
    render() {
        const {id, Dni, Name, LastName, Email} = this.props.info

        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle}>{Dni}</td>
                <td style={tableStyle}>{Name}</td>
                <td style={tableStyle}>{LastName}</td>
                <td style={tableStyle}>{Email}</td>
                <td style={columnButtonStyle}>
                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/empleados/${id}`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/editar-empleados/${id}`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    <button style={buttonStyle} onClick={ this.eliminarEmpleado } type="button" className="btn btn-danger">Borrar</button>
                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarEmpleado}) (Empleado);