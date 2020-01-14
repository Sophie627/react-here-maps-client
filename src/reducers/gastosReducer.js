import { MOSTRAR_GASTOS, MOSTRAR_GASTO, AGREGAR_GASTO, EDITAR_GASTO, BORRAR_GASTO } from '../actions/types';

const initialState = {
    gastos : []
};

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_GASTOS : 
            return {
                ...state,
                gastos : action.payload
            }
        case MOSTRAR_GASTO : 
            return {
                ...state,
                gasto : action.payload
            }
        case AGREGAR_GASTO :
            return {
                ...state,
            }
        case EDITAR_GASTO : 
            return {
                ...state,
                gastos : state.gastos.map(
                    gasto => gasto.id === action.payload.id ? (gasto = action.payload) : gasto 
                )
            }
        case BORRAR_GASTO : 
            return {
                ...state,
                gastos: state.gastos.filter( gastos => (gastos.id !== action.payload))
            }
        default : 
            return state;
    }
}
