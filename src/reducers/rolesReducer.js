import { MOSTRAR_ROLES, MOSTRAR_ROL, AGREGAR_ROL, EDITAR_ROL, BORRAR_ROL } from '../actions/types';

const initialState = {
    roles : []
};

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_ROLES : 
            return {
                ...state,
                roles : action.payload
            }
        case MOSTRAR_ROL : 
            return {
                ...state,
                rol : action.payload
            }
        case EDITAR_ROL :
            return {
                ...state,
            }
        case BORRAR_ROL : 
            return {
                ...state,
                roles: state.roles.filter( roles => (roles.id !== action.payload))
            }
        case AGREGAR_ROL : 
            return {
                ...state,
                roles : [...state.roles, action.payload]
            }
        default : 
            return state;
    }
}
