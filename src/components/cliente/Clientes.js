import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarCliente } from '../../actions/clientesAction';

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

class Cliente extends Component {

    eliminarCliente = () => {
        // console.log(this.props.info.id);
        // const { id } = this.props.info;

        this.props.eliminarCliente(this.props.info.id);
    }

    render() {
        const { Name, LastName, Email, Phone, id } = this.props.info
        // console.log(this.props.info)
        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle} >{Name}</td>
                <td style={tableStyle} >{LastName}</td>
                <td style={tableStyle} >{Email}</td>
                <td style={tableStyle} >{Phone}</td>
                <td style={columnButtonStyle}>
                    <Link style={buttonStyle} to={{
                        pathname : `/cliente/${id}`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link style={buttonStyle} to={{
                        pathname : `/clientes/editar-cliente/${id}`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    <button style={buttonStyle} onClick={ this.eliminarCliente } type="button" className="btn btn-danger">Borrar</button>
                
                    <Link style={buttonStyle} to={{
                        pathname : `/clientes/agregar-direccion-cliente/${id}`,
                        state : this.props.info
                        }} className="btn btn-info">
                        Direccion
                    </Link>
                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarCliente}) (Cliente);