import { MOSTRAR_CURRENT_USER, LOGIN_USER, FETCH_CURRENT_USER, SIGNIN, SIGNOUT } from '../actions/types';

const initialState = {
    usuario : [],
    logged: null,
    token: '',
    permisson: [],
    user: undefined
};

export default function (state = initialState, action){
    switch(action.type){
        case MOSTRAR_CURRENT_USER : 
            return {
                ...state,
                usuario : action.payload
            }
        case LOGIN_USER : 
            return {
                ...state, 
                token: action.payload.token, 
                logged: true,user:action.payload.user};
        case FETCH_CURRENT_USER:
            if (action.payload.sucess === false) {
                return {...state, logged: false};
            }
                return {...state, user: action.payload.User, logged: true};
        case SIGNIN:
            return {...state, token: action.payload.token, logged: true,user:action.payload.user};
        case SIGNOUT:
            return {...initialState, user: false};
        default :
            return state;
    }
}
