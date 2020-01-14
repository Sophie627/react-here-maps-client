import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

class ProductoIndividual extends Component {

  state = {
    date : ''
  }

  componentDidMount(){
    // console.log(this.props);
    // const { Details, Amount, Date, id } = this.props.location.state
    console.log(this.props.location.state.Date);
    let date1 = this.props.location.state.Date.split('/');
    const dateFinal = `${date1[2]}-${date1[1]}-${date1[0]}`
    this.setState({
      date : dateFinal
    })
  }

    render() {
        return (
            <div>
                <Header titulo = 'Datos de Gasto'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form className="col-8">
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input type="text" disabled defaultValue={this.props.location.state.Details} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Monto</label>
                                    <input type="number" disabled defaultValue={this.props.location.state.Amount} min="1" step="1" title="Numbers only" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input type="date" disabled defaultValue={this.state.date} className="form-control" required/>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default ProductoIndividual;