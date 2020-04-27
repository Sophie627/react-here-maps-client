import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Turno from './Turno'

import SortableTbl from "react-sort-search-table";

//Redux
import { connect } from 'react-redux';
import { mostrarTurnos } from '../../../actions/turnosAction';
import { eliminarTurno } from '../../../actions/turnosAction';

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

let col = ["Name", "InTime", "OutTime", "Actions"];
let tHead = [
    "Turno",
    "Hora de Entrada",
    "Hora de Salida",
    "Acciones",
];

class ActionTurnoComponent extends React.Component {

  eliminarTurno = () =>{
        const {id} = this.props.rowData;

        this.props.eliminarTurno(id);
    }

  render() {
    const { id } = this.props.rowData;
    return (
        <td style={columnButtonStyle}>
            <Link style={buttonStyle} to={{
                pathname : `/rrhh/empleados`,
                state : this.props.rowData
                }} className="btn btn-primary">
                Ver
            </Link>

            <Link style={buttonStyle} to={{
                pathname : `/rrhh/editar-empleados`,
                state : this.props.rowData
                }} className="btn btn-warning">
                Editar
            </Link>

            <button style={buttonStyle} onClick={ this.eliminarTurno } type="button" className="btn btn-danger">Borrar</button>
        </td> 
    );
  }
}

class ListaTurnos extends Component {

    componentDidMount(){
        this.props.mostrarTurnos();
    }

    render() {

        const turnos = this.props.turnos;
        
        if(turnos.length === 0){
            return (
                <h2>No hay datos para mostrar</h2>
            ) 
        }else{
            for (var i = 0; i < turnos.length; i++) {
                turnos[i].InTime = turnos[i].InHour + ":" + turnos[i].InMinute;
                turnos[i].OutTime = turnos[i].OutHour + ":" + turnos[i].OutMinute;
            }
            return (
                <SortableTbl tblData={turnos.sort(function(a, b) {return b.id - a.id})}
                    tHead={tHead}
                    customTd={[
                                {custd: (ActionTurnoComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarTurno = {this.props.eliminarTurno}
                />
            )
        }
    }
}

const mapStateToProps = state => ({
    turnos : state.turnos.turnos
});

export default connect(mapStateToProps, {
    mostrarTurnos,
    eliminarTurno
})(ListaTurnos);