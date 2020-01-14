import { MOSTRAR_CATEGORIAS, MOSTRAR_CATEGORIA, AGREGAR_CATEGORIA, BORRAR_CATEGORIA, EDITAR_CATEGORIA } from '../actions/types';

const initialState = {
    categorias : []
};

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_CATEGORIAS : 
            return {
                ...state,
                categorias : action.payload
            }
        case MOSTRAR_CATEGORIA : 
            return {
                ...state,
                categoria : action.payload
            }
        case BORRAR_CATEGORIA : 
            return {
                ...state,
                categorias: state.categorias.filter( categorias => (categorias.id !== action.payload))
            }
        case AGREGAR_CATEGORIA : 
            return {
                ...state,
                categorias : [...state.categorias, action.payload]
            }
        case EDITAR_CATEGORIA : 
            return {
                ...state,
                categorias : state.categorias.map(
                    categoria => categoria.id === action.payload.id ? (categoria = action.payload) : categoria 
                )
            }
        default : 
            return state;
    }
}