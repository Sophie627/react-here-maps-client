import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

import { connect } from 'react-redux';
import { mostrarGastos } from '../../actions/gastosAction';

class doughnut extends Component {

	state = { 
		nombreCategoria : [],
		cantidadProductos : [],
		coloresCategorias : [],
		hayValor : false,
	}

	componentDidMount(){
        this.props.mostrarGastos();
	}

	mostrarDatos = (data) => {

		if(this.state.hayValor === false){
			return(
			<React.Fragment>
				<h3 style={{textAlign: 'center'}}>No hay valores para mostrar</h3>
			</React.Fragment>
			)
		}else{
			return(
			<React.Fragment>
				<h3 style={{textAlign: 'center'}}>Productos</h3>
				<Doughnut data={data} />
			</React.Fragment>
			)
		}

	}

	render() {

		let suma = 0;

		if(this.props.gastos.length === 0) return <h3 style={{textAlign: 'center'}}>No hay valores para mostrar</h3>;
		
		console.log(this.props.gastos);

		this.props.gastos.map(cat => {
			this.state.nombreCategoria.push(cat.Details);
		})

		this.props.gastos.map(prod => {
			this.state.cantidadProductos.push(prod.Amount);
		})

		for (var i = 0; i < this.state.nombreCategoria.length; i++) {
			this.state.coloresCategorias.push("#"+((1<<24)*Math.random()|0).toString(16));
		}

		for (var i = 0; i < this.state.cantidadProductos.length; i++) {
			suma += this.state.cantidadProductos[i];
			if(suma > 0){
				this.state.hayValor = true
			}
		}

		const data = {
			labels: this.state.nombreCategoria,
			datasets: [{
				data: this.state.cantidadProductos,
				backgroundColor: this.state.coloresCategorias,
				hoverBackgroundColor: this.state.coloresCategorias
			}]
		};

		return (
		  <div>
			{this.mostrarDatos(data)}
		  </div>
		);
	  }
}

const mapStateToProps = state => ({
    gastos : state.gastos.gastos
});

export default connect(mapStateToProps, {mostrarGastos}) (doughnut);
