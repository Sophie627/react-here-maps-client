import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Pedido from './Pedido';
import SortableTbl from "react-sort-search-table";

//Redux

import { connect } from 'react-redux';
import { mostrarPedidos, eliminarPedido } from '../../actions/pedidosAction';

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


let col = ["pedDate", "State", "Users", "Clients", "Adress", "Amount", "Deliverys", "Actions"];
let tHead = [
    "Fecha",
    "Estado",
    "Empleado",
    "Cliente",
    "Direccion",
    "Monto",
    "Delivery",
    "Acciones",
];

class ActionPedidoComponent extends React.Component {

  eliminarPedido = () => {
      const {id} = this.props.rowData;

      this.props.eliminarPedido(id);
  }

  render() {
    const { id } = this.props.rowData;
    return (
        <td style={columnButtonStyle}>
            <Link style={buttonStyle} to={{
                pathname : `/pedidos/${id}`,
                state : this.props.rowData
                }} className="btn btn-primary">
                Ver
            </Link>

            <Link style={buttonStyle} to={{
                pathname : `/pedidos/editar-pedido/${id}`,
                state : this.props.rowData
                }} className="btn btn-warning">
                Editar
            </Link>

            <button style={buttonStyle} onClick={ this.eliminarPedido } type="button" className="btn btn-danger">Borrar</button>
        </td> 
    );
  }
}

class ListadoPedidos extends Component {

    state = {
        loading: true
    };

    componentDidMount(){
        this.props.mostrarPedidos();
    }

    render() {

        const pedidos = this.props.pedidos;

        var preparingOrders = [];

        console.log(pedidos);
        for (var i = 0; i < pedidos.length; i++) {
            if (pedidos[i].Date !== null) {

                var DateFormated = pedidos[i].Date.split("T");
                var HourFormated = DateFormated[1].split(".");
                pedidos[i].pedDate = DateFormated[0] + " " + HourFormated[0];
            } else {
                pedidos[i].pedDate = pedidos[i].Date;
            }
            pedidos[i].Users = pedidos[i].Users.Dni;
            pedidos[i].State = pedidos[i].State.Description;
            if (pedidos[i].Clients !== null) pedidos[i].Clients = (pedidos[i].Clients.Name + " " + pedidos[i].Clients.LastName).substr(0, 8);
            if (pedidos[i].Adress !== null) pedidos[i].Adress = pedidos[i].Adress.Adress + " " + pedidos[i].Adress.Floor + " " + pedidos[i].Adress.Department;
            // pedidos[i].Amount = "pedidos[i].Amount.toFixed(0)";

            // pedidos[i].Deliverys = "pedidos[i].Delivery.Name + pedidos[i].Delivery.LastName";

            if (pedidos[i].Delivery == null) {
                pedidos[i].Deliverys = "Sin Asignar"
            } else {
                pedidos[i].Deliverys = pedidos[i].Delivery.Name + " " + pedidos[i].Delivery.LastName;
            }
            if (pedidos[i].State != "Entregado") preparingOrders.push(pedidos[i]);
        }

        if(pedidos.length === 0) {

            if(pedidos.length === 0){
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
                    <div>
                    <h2 center align="center" style={{marginTop: '40px', marginBottom: '40px'}}>
                        No hay datos
                    </h2>
                    </div>
                )
            }
        }
        else{
            return (
                <SortableTbl tblData={preparingOrders.sort(function(a, b) {return b.id - a.id})}
                    tHead={tHead}
                    customTd={[
                                {custd: (ActionPedidoComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarPedido = {this.props.eliminarPedido}
                />
            );
		}

    }
}

const mapStateToProps = state => ({
    pedidos : state.pedidos.pedidos
});

export default connect(mapStateToProps, {
    mostrarPedidos,
    eliminarPedido
})(ListadoPedidos);