import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';

//CSS
import '../../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { agregarProducto } from '../../../actions/productosAction'

class NuevoProducto extends Component {

    state = {
        error : false
    }

    nombreRef = React.createRef();
    descripcionRef = React.createRef();
    amountRef = React.createRef();

    crearProducto = (e) => {

        e.preventDefault();

        const producto = {
            name : this.nombreRef.current.value,
            description : this.descripcionRef.current.value,
            amount : this.amountRef.current.value,
            category : this.props.location.state
        }

        if(producto.name === '' || producto.description === '' || producto.amount === ''){
            // console.log('error');
            this.setState({error : true});
            Swal.fire({
                title: 'Error!',
                text: 'Faltan o hay errores en el formulario',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }else{
            // console.log("Correcto")
            this.setState({error : false});
            this.props.agregarProducto(producto)
        }

        e.currentTarget.reset();

    }

    render() {
        return (
            <div>
                <Header titulo = 'Alta de Producto'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form onSubmit={this.crearProducto} className="col-8">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input ref={this.nombreRef} type="text" placeholder="Empanadas" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input ref={this.descripcionRef} type="text" placeholder="Humita - J&Q - Carne" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Monto</label>
                                    <input ref={this.amountRef} type="number" placeholder="$" min="1" step="1" title="Numbers only" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Enviar" className="btn btn-primary"/>
                                </div>
                            </form>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    productos : state.productos.productos
});

export default connect(mapStateToProps, {agregarProducto})(NuevoProducto);