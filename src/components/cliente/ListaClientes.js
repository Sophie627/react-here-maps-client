import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Clientes from './Clientes'
import SortableTbl from "react-sort-search-table";

//Redux
import { connect } from 'react-redux';
import { mostrarClientes } from '../../actions/clientesAction';
import { eliminarCliente } from '../../actions/clientesAction';

//CSS
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
    maxWidth: "100%",
    minWidth: "100%",
    paddingTop: 3
};

const buttonStyle = {
    marginLeft: 10,
    width: 80
};

let col = ["Name", "LastName", "Email", "Phone", "Actions"];
let tHead = [
    "Nombre",
    "Apellido",
    "Email",
    "Telefono",
    "Acciones",
];

class ActionClienteComponent extends React.Component {

  eliminarCliente = () => {

      this.props.eliminarCliente(this.props.rowData.id);
  }

  render() {
    const { id } = this.props.rowData;
    return (
        <td style={columnButtonStyle}>
            <Link style={buttonStyle} to={{
                pathname : `/cliente/${id}`,
                state : this.props.rowData
                }} className="btn btn-primary">
                Ver
            </Link>

            <Link style={buttonStyle} to={{
                pathname : `/clientes/editar-cliente/${id}`,
                state : this.props.rowData
                }} className="btn btn-warning">
                Editar
            </Link>

            <button style={buttonStyle} onClick={ this.eliminarCliente } type="button" className="btn btn-danger">Borrar</button>
        
            <Link style={buttonStyle} to={{
                pathname : `/clientes/agregar-direccion-cliente/${id}`,
                state : this.props.rowData
                }} className="btn btn-info">
                Direccion
            </Link>
        </td> 
    );
  }
}

class ListaClientes extends Component {

    state = {
        loading: true
    };

    componentDidMount(){
        this.props.mostrarClientes();
    }

    render() {
        const clientes = this.props.clientes;

        if(clientes.length === 0) {
            return (
                <div style={{marginTop: '40px', marginBottom: '40px'}}>
                    <DotLoader
                    css={override}
                    size={50} // or 150px
                    color={"#4D4D4D"}
                    loading={this.state.loading}
                    />
                </div>
        )}
        else{

        return (
            <SortableTbl tblData={clientes.sort(function(a, b) {return b.id - a.id})}
                tHead={tHead}
                customTd={[
                            {custd: (ActionClienteComponent), keyItem: "Actions"},
                            ]}
                dKey={col}
                search={true}
                defaultCSS={true}
                eliminarCliente = {this.props.eliminarCliente}
            />
        );
        }
    }
}

const mapStateToProps = state => ({
    clientes : state.clientes.clientes
});

export default connect(mapStateToProps, {
    mostrarClientes,
    eliminarCliente
})(ListaClientes);