import {FETCH_CURRENT_USER, SIGNIN, SIGNOUT} from '../actions/types';

// LOGIN_ERROR, PATIENT_ID

/*
Estados de la autenticacion
null: no sabemos si el usuario está logueado o no. Por ejemplo si tarda mucho el request al server, el estado va a ser null hasta que vuelva
false: Sabemos que el usuario no está logueado
User: El usuario está logueado
Definimos el estado default como null
*/
const initialState = {
    logged: null,
    token: '',
    permisson: [],
    user: undefined
};


export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CURRENT_USER:
        if (action.payload.sucess === false) {
            return {...state, logged: false};
        }
            return {...state, user: action.payload.User, logged: true};
        case SIGNIN:
            return {...state, token: action.payload.token, logged: true,user:action.payload.user};
        case SIGNOUT:
            return {...initialState, user: false};
        default:
            return state;
    }
}