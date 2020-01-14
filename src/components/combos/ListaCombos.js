import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { mostrarCombos } from '../../actions/combosAction';

import SortableTbl from "react-sort-search-table";
import { Link } from "react-router-dom";

import { eliminarCombo } from "../../actions/combosAction";

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


let col = ["Name", "Description", "Amount", "Actions"];
let tHead = [
  "Nombre Combo",
  "Descripcion",
  "Monto",
  "Acciones",
];

class ActionComboComponent extends React.Component {

  eliminarCombo = () => {
    const { id } = this.props.rowData;

    this.props.eliminarCombo(id);
  };

  render() {
    const { id } = this.props.rowData;
    return (
      <td style={columnButtonStyle}>
        <Link
          style={buttonStyle}
          to={{
            pathname: `/combos/${id}`,
            state: this.props.rowData
          }}
          className="btn btn-primary"
        >
          Ver
        </Link>

        <Link
          style={buttonStyle}
          to={{
            pathname: `/combos/editar-combo/${id}`,
            state: this.props.rowData
          }}
          className="btn btn-warning"
        >
          Editar
        </Link>

        <button
          style={buttonStyle}
          onClick={this.eliminarCombo}
          type="button"
          className="btn btn-danger"
        >
          Borrar
        </button>
      </td>
    );
  }
}

class ListaCombos extends Component { 

    state = {
      loading: true
    };
  
    componentDidMount(){
        this.props.mostrarCombos();
    }


    render() {
        const combos = this.props.combos;

        if(combos.length === 0) {
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
          <SortableTbl tblData={combos}
              tHead={tHead}
              customTd={[
                          {custd: (ActionComboComponent), keyItem: "Actions"},
                          ]}
              dKey={col}
              search={true}
              defaultCSS={true}
              eliminarCombo = {this.props.eliminarCombo}
          />
        );

      }
        
    }
}

const mapStateToProps = state => ({
    combos : state.combos.combos
});

export default connect(mapStateToProps, {
        mostrarCombos,
        eliminarCombo
    })(
  ListaCombos
);