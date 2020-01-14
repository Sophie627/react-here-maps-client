import { MOSTRAR_TURNOS, MOSTRAR_TURNO, AGREGAR_TURNO, EDITAR_TURNO, BORRAR_TURNO } from '../actions/types';

const initialState = {
    turnos : []
};

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_TURNOS : 
            return {
                ...state,
                turnos : action.payload
            }
        case MOSTRAR_TURNO : 
            return {
                ...state,
                turno : action.payload
            }
        case EDITAR_TURNO :
            return {
                ...state,
            }
        case BORRAR_TURNO : 
            return {
                ...state,
                turnos: state.turnos.filter( turnos => (turnos.id !== action.payload))
            }
        case AGREGAR_TURNO : 
            return {
                ...state,
                turnos : [...state.turnos, action.payload]
            }
        default : 
            return state;
    }
}
