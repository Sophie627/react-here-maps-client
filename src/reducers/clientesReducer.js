import { MOSTRAR_CLIENTES, MOSTRAR_CLIENTE_TELEFONO, AGREGAR_DIRECCION_CLIENTE, AGREGAR_CLIENTE, EDITAR_CLIENTE, BORRAR_CLIENTE } from '../actions/types';

const initialState = {
    clientes : [],
    direccion : []
};

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_CLIENTES : 
            return {
                ...state,
                clientes : action.payload
            }
        case MOSTRAR_CLIENTE_TELEFONO : 
            return {
                ...state,
                cliente : action.payload
            }
        case BORRAR_CLIENTE : 
            return {
                ...state,
                clientes: state.clientes.filter( clientes => (clientes.id !== action.payload))
            }
        case AGREGAR_DIRECCION_CLIENTE : 
            return {
                ...state,
                direccion : [...state.direccion, action.payload]
            } 
        case AGREGAR_CLIENTE : 
            return {
                ...state,
                clientes : [...state.clientes, action.payload]
            }
        case EDITAR_CLIENTE : 
            return {
                ...state,
                clientes : state.clientes.map(
                    cliente => cliente.id === action.payload.id ? (cliente = action.payload) : cliente 
                )
            }
        default : 
            return state;
    }
}