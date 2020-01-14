import React from 'react';

const ListadoEmpleadosEdicion = (props) => {
    return (
        <option value={props.empleados.id}>{props.empleados.Name}</option>
    );
};

export default ListadoEmpleadosEdicion;