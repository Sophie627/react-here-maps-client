import { MOSTRAR_ASISTENCIAS, MOSTRAR_ASISTENCIA, AGREGAR_ASISTENCIA, EDITAR_ASISTENCIA, BORRAR_ASISTENCIA } from '../actions/types';

const initialState = {
    asistencias : []
};

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_ASISTENCIAS : 
            return {
                ...state,
                asistencias : action.payload
            }
        case MOSTRAR_ASISTENCIA : 
            return {
                ...state,
                asistencia : action.payload
            }
        case EDITAR_ASISTENCIA :
            return {
                ...state,
            }
        case BORRAR_ASISTENCIA : 
            return {
                ...state,
                asistencias: state.asistencias.filter( asistencias => (asistencias.id !== action.payload))
            }
        case AGREGAR_ASISTENCIA : 
            return {
                ...state,
                asistencias : [...state.asistencias, action.payload]
            }
        default : 
            return state;
    }
}
