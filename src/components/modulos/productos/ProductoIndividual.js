import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';

//CSS
import '../../../assets/css/empleados/form-alta-empleados.css';

class ProductoIndividual extends Component {

  componentDidMount(){
    console.log(this.props);
  }

    render() {
        return (
            <div>
                <Header titulo = 'Datos de Producto'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form className="col-8">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" disabled defaultValue={this.props.location.state.Name} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input type="text" disabled defaultValue={this.props.location.state.Description} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Monto</label>
                                    <input type="number" disabled defaultValue={this.props.location.state.Amount} min="1" step="1" title="Numbers only" className="form-control" required/>
                                </div>
                                {/* <div className="form-group">
                                    <input type="submit" disabled value="Enviar" className="btn btn-primary"/>
                                </div> */}
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default ProductoIndividual;