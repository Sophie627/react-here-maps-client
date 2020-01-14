import React, { Component } from 'react';

import axios from 'axios';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
import MapaPedidos from "./mapaPedidos";
import OrderBox from "./orderBox";

//Redux
import { connect } from 'react-redux';
import { mostrarPedidos, asignarDelivery } from '../../../actions/pedidosAction';
import { mostrarEmpleados } from '../../../actions/empleadosAction';

class AsignarPedido extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      pedidos: {},
      empleados: {},
    };
    // this.handleLine = this.handleLine.bind(this);
  }
  // componentDidMount() {
  // }
  // handleLine(param) {
  //   this.props.asignarDelivery(param);
  //   // this.forceUpdate();
  // };

  componentWillMount() {
    this.props.mostrarPedidos();
    this.props.mostrarEmpleados();
  };
  
  render() {

    const pedidos = this.props.pedidos;
    const empleados = this.props.empleados;

    return (
      <React.Fragment>
        <Header titulo="Asignar Delivery" />
        <div className="table-empleados">
          <MapaPedidos />
        </div>
        <OrderBox pedidos={pedidos} empleados={empleados}/>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  pedidos: state.pedidos.pedidos,
  empleados: state.empleados.empleados,
  line: state.pedidos.line,
});

export default connect(mapStateToProps, {
  mostrarPedidos,
  mostrarEmpleados,
  asignarDelivery,
})(AsignarPedido);