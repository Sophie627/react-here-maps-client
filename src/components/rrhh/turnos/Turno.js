import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarTurno } from '../../../actions/turnosAction'

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

class Turno extends Component {

    eliminarTurno = () =>{
        const {id} = this.props.info;

        this.props.eliminarTurno(id);
    }

    render() {
        const {Name, InHour, InMinute, OutHour, OutMinute} = this.props.info

        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle} >{Name}</td>
                <td style={tableStyle} >{InHour}:{InMinute}</td>
                <td style={tableStyle} >{OutHour}:{OutMinute}</td>
                <td style={columnButtonStyle}>
                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/empleados`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/editar-empleados`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    <button style={buttonStyle} onClick={ this.eliminarTurno } type="button" className="btn btn-danger">Borrar</button>
                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarTurno}) (Turno);