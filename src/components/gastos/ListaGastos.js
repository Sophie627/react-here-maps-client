import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Gasto from './Gasto'
import SortableTbl from "react-sort-search-table";

//Redux
import { connect } from 'react-redux';
import { mostrarGastos } from '../../actions/gastosAction';
import { eliminarGasto } from '../../actions/gastosAction';

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


let col = ["Details", "Amount", "Date", "Actions"];
let tHead = [
    "Tipo Gasto",
    "Monto",
    "Fecha",
    "Acciones",
];

class ActionGastoComponent extends React.Component {

  eliminarGasto = () => {
      this.props.eliminarGasto(this.props.rowData.id);
  }

  render() {
    const { id } = this.props.rowData;
    return (
      <td style={columnButtonStyle}>
        <Link style={buttonStyle} to={{
            pathname : `/gastos/${id}`,
            state : this.props.rowData
            }} className="btn btn-primary">
            Ver
        </Link>

        <Link style={buttonStyle} to={{
            pathname : `/gastos/editar-gasto/${id}`,
            state : this.props.rowData
            }} className="btn btn-warning">
            Editar
        </Link>

        <button style={buttonStyle} onClick={ this.eliminarGasto } type="button" className="btn btn-danger">Borrar</button>
    </td> 
    );
  }
}

class ListaGastos extends Component {

    state = {
        loading: true
    };

    componentDidMount(){
        this.props.mostrarGastos();
    }

    render() {
        console.log("token", localStorage.getItem('access-token'));
        const gastos = this.props.gastos;

        if(gastos.length === 0) {
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
                    gastos.sort(function (a, b) {
                        return b.id - a.id
                    })
                }
                    tHead={tHead}
                    customTd={[
                                {custd: (ActionGastoComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarGasto = {this.props.eliminarGasto}
                />
            );

		}
        
    }
}

const mapStateToProps = state => ({
    gastos : state.gastos.gastos
});

export default connect(mapStateToProps, {
    mostrarGastos,
    eliminarGasto
})(ListaGastos);