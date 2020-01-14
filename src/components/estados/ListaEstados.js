import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Redux
import { connect } from 'react-redux';
import { mostrarEstados } from '../../actions/estadosAction';
import { eliminarEstado } from '../../actions/estadosAction';

import SortableTbl from "react-sort-search-table";

const columnButtonStyle = {
    maxWidth: "100%",
    minWidth: "100%",
    paddingTop: 3
};

const buttonStyle = {
    marginLeft: 10,
    width: 80
};

let col = ["Description", "Key", "Actions"];
let tHead = [
    "Descripcion",
    "Abreviatura",
    "Acciones",
];

class ActionEstadoComponent extends React.Component {

  eliminarEstado = () => {
    this.props.eliminarEstado(this.props.rowData.id);
  }

  render() {
    const { id } = this.props.rowData;

    return (
        <td style={columnButtonStyle}>
            <Link style={buttonStyle} to={{
                pathname : `/pedido/estado/${id}`,
                state : this.props.rowDats
                }} className="btn btn-primary">
                Ver
            </Link>

            <Link style={buttonStyle} to={{
                pathname : `/pedido/editar-estado/${id}`,
                state : this.props.rowDats
                }} className="btn btn-warning">
                Editar
            </Link>

            <button style={buttonStyle} onClick={ this.eliminarEstado } type="button" className="btn btn-danger">Borrar</button>
        </td> 
    );
  }
}

class ListaEstados extends Component {

    componentDidMount(){
        this.props.mostrarEstados();
    }

    render() {
        const estados = this.props.estados;

        return (
            <SortableTbl tblData={estados}
                tHead={tHead}
                customTd={[
                            {custd: (ActionEstadoComponent), keyItem: "Actions"},
                            ]}
                dKey={col}
                search={true}
                defaultCSS={true}
                eliminarEstado = {this.props.eliminarEstado}
            />
        );
    }
}

const mapStateToProps = state => ({
    estados : state.estados.estados
});

export default connect(mapStateToProps, {
    mostrarEstados,
    eliminarEstado
})(ListaEstados);