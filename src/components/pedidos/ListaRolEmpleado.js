import React from 'react';

const ListaRolEmpleado = (props) => {
    // {console.log(props.roles)}
    return (
        <option value={props.roles.id}>{props.roles.Name}</option>
    );
};

export default ListaRolEmpleado;