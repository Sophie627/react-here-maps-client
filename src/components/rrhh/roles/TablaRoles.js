import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaRoles from './ListaRoles';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

class Roles extends Component {
    render() {
        return (
            <div>
                <Header 
                    titulo = 'Lista de Roles'
                />
                <div className="col-12 col-md-12">
                    <ListaRoles/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/rrhh/alta-rol`} className="btn btn-success">Nuevo Rol</Link> 
                    </div>          
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Roles;