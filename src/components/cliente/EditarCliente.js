import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { editarGasto } from '../../actions/gastosAction';

class EditarGasto extends Component {

  state = {
    date : ''
  }

    detalleRef = React.createRef();
    montoRef = React.createRef();
    fechaRef = React.createRef();

  componentDidMount(){
    console.log(this.props);
    // const { Details, Amount, Date, id } = this.props.location.state
    console.log(this.props.location.state.Date);
    let date1 = this.props.location.state.Date.split('/');
    const dateFinal = `${date1[2]}-${date1[1]}-${date1[0]}`
    
    this.setState({
      date : dateFinal
    })

  }

  editarGasto = (e) => {
    e.preventDefault();

    let fechaArr = this.fechaRef.current.value.split('-');

    const fecha = fechaArr[2] + "/" + fechaArr[1] + "/" + fechaArr[0];

    console.log(fecha)
    console.log(this.montoRef.current.value)

    if(fechaArr[0].length == 5 || fechaArr[0].length === 5){
        Swal.fire({
            title: 'Error!',
            text: 'La fecha esta mal ingresada, favor de chequearla',
            type: 'error',
            confirmButtonText: 'Reintentar'
        })
        return;
    }else{
        const gasto = {
        id : this.props.location.state.id,
        details : this.detalleRef.current.value,
        amount : this.montoRef.current.value,
        date : fecha,
        user : this.props.location.state.User,
        }

        // console.log(gasto);
        this.props.editarGasto(gasto);
    }
  }

    render() {
        return (
            <div>
                <Header titulo = 'Editar Gasto'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form onSubmit={this.editarGasto} className="col-8">
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input ref={this.detalleRef} type="text" defaultValue={this.props.location.state.Details} className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Monto</label>
                                    <input ref={this.montoRef} type="number" defaultValue={this.props.location.state.Amount} min="1" step="1" title="Numbers only" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input ref={this.fechaRef} type="date" defaultValue={this.state.date} className="form-control" required/>
                                </div>
                                <div center="true" align="center" className="form-group">
                                    <input type="submit" value="Enviar" className="btn btn-primary" required/>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default connect(null, { editarGasto })(EditarGasto);