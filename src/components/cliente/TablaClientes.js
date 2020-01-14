import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaClientes from './ListaClientes';
import Header from '../header/IndexHeader';
import StickyButton from '../bottom/StickyButton';

class Clientes extends Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <Header 
                    titulo = 'Lista de Clientes'
                />
                <div className="col-12 col-md-12">
                    <ListaClientes/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/clientes/alta-cliente`} className="btn btn-success">Nuevo Cliente</Link> 
                    </div>
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Clientes;