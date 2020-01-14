import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListadoCategorias from './ListaCategorias';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

class Categorias extends Component {
    render() {
        // console.log(this.props);
        return (
            <div>
                <Header 
                    titulo = 'Lista de Categorias'
                />
                <div className="col-12 col-md-12">
                    <ListadoCategorias/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/modulo/alta-categoria`} className="btn btn-success">Nueva Categoria</Link> 
                    </div>
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Categorias;