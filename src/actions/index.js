import axios from 'axios';
import {FETCH_CURRENT_USER, SIGNIN, SIGNOUT, LOGIN_ERROR, PATIENT_ID} from './types';


export const fetchCurrentUser = () => async dispatch => {
   try{
    const user = await axios.get("https://roraso.herokuapp.com/User/CurrentUser",
    { headers: { 'access-token': localStorage.getItem('access-token')}});
    
    dispatch({
        type: FETCH_CURRENT_USER, 
        payload: user.data
    });

   }catch(error){
    //    alert(error)
   }
};

export const signIn = (data) =>  dispatch => {
    try {
        localStorage.setItem('access-token', data.token)
        dispatch({type: SIGNIN, payload: data});
    }
    catch(err) {

    }
};

export const signOut = () => {
    localStorage.removeItem('access-token');
    return {
        type: SIGNOUT
    }
};

export const savePatientId = (patientId) => {
    return {
        type: PATIENT_ID,
        payload: patientId
    }
};