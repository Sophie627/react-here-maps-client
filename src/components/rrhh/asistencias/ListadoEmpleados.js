import React from 'react';

const ListadoEmpleados = (props) => {
    return (
        <option value={props.empleados.id}>{props.empleados.Name}</option>
    );
};

export default ListadoEmpleados;