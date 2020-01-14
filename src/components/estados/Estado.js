import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarEstado } from '../../actions/estadosAction';

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

class Estado extends Component {

    eliminarEstado = () => {
        // console.log(this.props.info.id);
        // const { id } = this.props.info;

        this.props.eliminarEstado(this.props.info.id);
    }

    render() {
        const { Description, Key, id } = this.props.info;
        // console.log(this.props.info)
        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle} >{Description}</td>
                <td style={tableStyle} >{Key}</td>
                <td style={columnButtonStyle}>
                    <Link style={buttonStyle} to={{
                        pathname : `/pedido/estado/${id}`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link style={buttonStyle} to={{
                        pathname : `/pedido/editar-estado/${id}`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    <button style={buttonStyle} onClick={ this.eliminarEstado } type="button" className="btn btn-danger">Borrar</button>
                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarEstado}) (Estado);