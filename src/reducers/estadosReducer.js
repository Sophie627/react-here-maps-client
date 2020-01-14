import { MOSTRAR_ESTADOS, AGREGAR_ESTADO, EDITAR_ESTADO, BORRAR_ESTADO } from '../actions/types';
 
const initialState = {
   estados : []
};
 
export default function (state = initialState, action){
   switch(action.type){
       case MOSTRAR_ESTADOS :
           return {
               ...state,
               estados : action.payload
           }
       case EDITAR_ESTADO :
           return {
               ...state,
               estados : state.estados.map(
                   estado => estado.id === action.payload.id ? (estado = action.payload) : estado
               )
           }
       case BORRAR_ESTADO :
           return {
               ...state,
               estados: state.estados.filter( estados => (estados.id !== action.payload))
           }
       case AGREGAR_ESTADO :
           return {
               ...state,
               estados : [...state.estados, action.payload]
           }
       default :
           return state;
   }
}
