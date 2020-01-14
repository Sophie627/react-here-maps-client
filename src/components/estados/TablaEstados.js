import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaEstados from './ListaEstados';
import Header from '../header/IndexHeader';

class Estados extends Component {
    render() {
        // console.log(this.props);
        return (
            <div>
                <Header 
                    titulo = 'Lista de Estados'
                />
                <div className="col-12 col-md-12">
                    <ListaEstados/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/pedido/alta-estado`} className="btn btn-success">Nuevo Estado</Link> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Estados;