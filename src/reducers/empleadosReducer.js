import { MOSTRAR_EMPLEADOS, MOSTRAR_EMPLEADO, AGREGAR_EMPLEADO, EDITAR_EMPLEADO, BORRAR_EMPLEADO } from '../actions/types';

//Cada reducer tiene que tener su propio state, state inicial

const initialState = {
    empleados : []
};

export default function(state = initialState, action){
    switch(action.type){
        case MOSTRAR_EMPLEADOS :
            return {
                ...state,
                empleados: action.payload
            }
        case MOSTRAR_EMPLEADO :
            return {
                ...state,
                empleado: action.payload
            }
        case BORRAR_EMPLEADO : 
            return {
                ...state,
                empleados: state.empleados.filter( empleados => (empleados.id !== action.payload))
            }
        case AGREGAR_EMPLEADO : 
            return {
                ...state,
                empleados : [...state.empleados, action.payload]
            }
        case EDITAR_EMPLEADO :
            return {
                ...state,
                empleados : state.empleados.map(
                    empleado => empleado.Dni === action.payload.dni ? (empleado = action.payload) : empleado 
                )
            }
        default : 
            return state;
    }
}