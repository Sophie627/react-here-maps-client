import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaTurnos from './ListaAsistencias';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

class Asistencia extends Component {
    render() {
        return (
            <div>
                <Header 
                    titulo = 'Lista de Asistencia'
                />
                <div className="col-12 col-md-12">
                    <ListaTurnos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/rrhh/alta-asistencia`} className="btn btn-success">Nueva Asistencia</Link> 
                    </div>
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Asistencia;