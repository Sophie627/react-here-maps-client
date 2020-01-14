import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarProducto } from '../../../actions/productosAction'

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

const tableStyle = {
    marginTop: 20,
    maxWidth: '100%',
    minWidth: '100%'
}

class Producto extends Component {

    eliminarProducto = (id) =>{
        // const {id} = this.props.info;

        // console.log(id);
        this.props.eliminarProducto(id);
    }
    
    render() {

        console.log(this.props);

        return (
            <React.Fragment>
                <React.Fragment>
                {this.props.info.map(producto => (
                <tr key = {producto.id}>
                    <td style={tableStyle}>{producto.Name}</td>
                    <td style={tableStyle}>{producto.Description}</td>
                    <td style={tableStyle}>{producto.Amount}</td>
                    <td style={tableStyle}>{this.props.nameCat}</td>
                    <td style={columnButtonStyle}>
                        <Link style={buttonStyle} to={{
                            pathname : `/producto/productoid/${producto.id}`,
                            state : producto
                            }} className="btn btn-primary">
                            Ver
                        </Link>
    
                        <Link style={buttonStyle} to={{
                            pathname : `/producto/editar-producto/${producto.id}`,
                            state : producto
                            }} className="btn btn-warning">
                            Editar
                        </Link>
    
                        <button style={buttonStyle} onClick={ this.eliminarProducto.bind(this, producto.id) } type="button" className="btn btn-danger">Borrar</button>
                    </td> 
                </tr>
                ))}
                </React.Fragment>
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarProducto}) (Producto);