import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaGastos from './ListaGastos';
import Header from '../header/IndexHeader';
import StickyButton from '../bottom/StickyButton';

class Gastos extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Header 
                    titulo = 'Lista de Gastos'
                />
                <div className="col-12 col-md-12">
                    <ListaGastos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/gastos/alta-gasto`} className="btn btn-success">Nuevo Gasto</Link> 
                    </div>
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Gastos;