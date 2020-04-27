import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Rol from './Rol'
import SortableTbl from "react-sort-search-table";

//Redux
import { connect } from 'react-redux';
import { mostrarRoles } from '../../../actions/rolesAction';
import { eliminarRol } from '../../../actions/rolesAction'

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
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

let col = ["Name", "Description", "Actions"];
let tHead = [
    "Nombre",
    "Detalle",
    "Acciones",
];

class ActionRolComponent extends React.Component {

  eliminarRol = () => {

        const {id} = this.props.rowData;

        this.props.eliminarRol(id);
    }

  render() {
    const { id } = this.props.rowData;
    return (
        <td style={columnButtonStyle}>
            <Link style={buttonStyle} to={{
                pathname : `/rrhh/roles/${id}`,
                state : this.props.rowData
                }} className="btn btn-primary">
                Ver
            </Link>

            <Link style={buttonStyle} to={{
                pathname : `/rrhh/editar-roles/${id}`,
                state : this.props.rowData
                }} className="btn btn-warning">
                Editar
            </Link>

            <button style={buttonStyle} onClick={ this.eliminarRol } type="button" className="btn btn-danger">Borrar</button>
        </td> 
    );
  }
}

class ListaRoles extends Component {

    state = {
        loading: true
    };

    componentDidMount(){
        this.props.mostrarRoles();
    }

    render() {

        const roles = this.props.roles;

        if(roles.length === 0) {
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
                < SortableTbl tblData = {
                    roles.sort(function (a, b) {
                        return b.id - a.id
                    })
                }
                    tHead={tHead}
                    customTd={[
                                {custd: (ActionRolComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarRol = {this.props.eliminarRol}
                />
            );
	    }

        
    }
}

const mapStateToProps = state => ({
    roles : state.roles.roles
});

export default connect(mapStateToProps, {
    mostrarRoles,
    eliminarRol
})(ListaRoles);