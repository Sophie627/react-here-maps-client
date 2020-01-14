import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaTurnos from './ListaTurnos';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

class Turnos extends Component {
    render() {
        return (
            <div>
                <Header 
                    titulo = 'Lista de Turnos'
                />
                <div className="col-12 col-md-12">
                    <ListaTurnos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/rrhh/alta-turno`} className="btn btn-success">Nuevo Turno</Link> 
                    </div>
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Turnos;