import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListadoProductos from './ListaProductos';
import Header from '../../header/IndexHeader';

class Productos extends Component {
    render() {
        // console.log(this.props);
        return (
            <div>
                <Header 
                    titulo = 'Lista de Productos'
                />
                <div className="col-12 col-md-12">
                    <ListadoProductos
                        nameCat = {this.props.history.location.nameCat}
                        // borrarEmpleado = {this.props.borrarEmpleado}
                    />
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={{
                            pathname : `/modulo/alta-producto`,
                            state : this.props.match.params.idCat
                            }} className="btn btn-success">
                            Nuevo Producto
                        </Link> 
                    </div>          
                </div>
            </div>
        );
    }
}

export default Productos;