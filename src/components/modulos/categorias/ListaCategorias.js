import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Categoria from './Categoria';
import SortableTbl from "react-sort-search-table";

//Redux

import { connect } from 'react-redux';
import { mostrarCategorias } from '../../../actions/categoriasAction';
import { eliminarCategoria } from '../../../actions/categoriasAction'

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


let col = ["Name", "Description", "Actions"];
let tHead = [
    "Nombre",
    "Descripcion",
    "Acciones",
];

class ActionCategoriasComponent extends React.Component {

  eliminarCategoria = () =>{
        const {id} = this.props.rowData;

        this.props.eliminarCategoria(id);
    }

  render() {
    const { id } = this.props.rowData;
    return (
      <td style={columnButtonStyle}>
        <Link style={buttonStyle} to={{
            pathname : `/producto/${id}`,
            state : this.props.rowData,
            nameCat : this.props.rowData.Name
            }} className="btn btn-primary">
            Ver
        </Link>
            
        <Link style={buttonStyle} to={{
            pathname : `/modulo/editar-categoria/${id}`,
            state : this.props.rowData
            }} className="btn btn-warning">
            Editar
        </Link>

        <button style={buttonStyle} onClick={ this.eliminarCategoria } type="button" className="btn btn-danger">Borrar</button>
      </td>
    );
  }
}

class ListadoCategorias extends Component {
    
    state = {
        loading: true
    };

    componentDidMount(){
        this.props.mostrarCategorias();
    }

    render() {
        const categorias = this.props.categorias;

        if(categorias.length === 0) {
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
                    categorias.sort(function (a, b) {
                        return b.id - a.id
                    })
                }
                    tHead={tHead}
                    customTd={[
                                {custd: (ActionCategoriasComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarCategoria = {this.props.eliminarCategoria}
                />
            );

		}
        
    }
}

const mapStateToProps = state => ({
    categorias : state.categorias.categorias
});

export default connect(mapStateToProps, {
    mostrarCategorias,
    eliminarCategoria
})(ListadoCategorias);