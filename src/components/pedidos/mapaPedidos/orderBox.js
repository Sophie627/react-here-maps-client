import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SortableTbl from "react-sort-search-table";
//CSS
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

//Redux

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

let col = ["Order", "Delivery", "Actions"];
let tHead = [
    "Order",
    "Delivery",
    "Acciones",
];

class ActionOrderComponent extends React.Component {

  render() {
    const { id } = this.props.rowData;
    return (
        <td style={columnButtonStyle}>

            <Link style={buttonStyle} to={{
                pathname : `/order/editar-orders/${id}`,
                state : this.props.rowData
                }} className="btn btn-warning">
                Editar
            </Link>

        </td> 
    );
  }
}

class OrderBox extends React.Component {
    
    state = {
        loading: true
    };

    render() {

        const pedidos = this.props.pedidos;

        var orders = [];
        for(var i = 0; i < pedidos.length; i++) {
            if (pedidos[i].Delivery !== null) {

                orders.push({
                    id: pedidos[i].id,
                    Order: "Pedido " + pedidos[i].id,
                    Delivery: pedidos[i].Delivery.Name + " " + pedidos[i].Delivery.LastName,
                    DeliveryId: pedidos[i].Delivery.id,
                });
            } else {
                    orders.push({
                        id: pedidos[i].id,
                        Order: "Pedido " + pedidos[i].id,
                        Delivery: "Sin Asignar",
                        DeliveryId: null,
                    });

            }
        }

        if(pedidos.length === 0) {
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
                <div style={{ width: "95%", margin: "30px auto" }}>
    
                    <SortableTbl tblData = {orders}
                        tHead={tHead}
                        customTd={[
                                    {custd: (ActionOrderComponent), keyItem: "Actions"},
                                    ]}
                        dKey={col}
                        search={true}
                        defaultCSS={true}
                    />
                </div>
            );

		}

        
    }
    
}

export default OrderBox;