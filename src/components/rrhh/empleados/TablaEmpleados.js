import React, { Component, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import ListadoEmpleados from './ListaEmpleados';
import Header from '../../header/IndexHeader';
import StickyButton from '../../bottom/StickyButton';

// const ListadoEmpleados = lazy(() => import('./ListaEmpleados'))

class Empleados extends Component {
    render() {
        return (
            <div>
                <Header 
                    titulo = 'Lista de Empleados'
                />
                <div className="col-12 col-md-12">

                {/* <Suspense fallback={<h1>Still Loading…</h1>}> */}
                    <ListadoEmpleados/>
                {/* </Suspense> */}
                    
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/rrhh/alta-empleado`} className="btn btn-success">Nuevo Empleado</Link> 
                    </div>          
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Empleados;