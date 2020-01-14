import { combineReducers } from 'redux';
import authReducer from './authReducer';
import empleadosReducer from './empleadosReducer';
import rolesReducer from './rolesReducer';
import productosReducer from './productosReducer';
import categoriasReducer from './categoriasReducer';
import turnosReducer from './turnosReducer';
import asistenciasReducer from './asistenciasReducer';
import gastosReducer from './gastosReducer';
import combosReducer from './combosReducer';
import pedidosReducer from './pedidosReducer';
import estadosReducer from './estadosReducer';
import clientesReducer from './clientesReducer';
import userReducer from './userReducer';


export default combineReducers({
    auth : authReducer,
    empleados : empleadosReducer,
    roles : rolesReducer,
    productos : productosReducer,
    categorias : categoriasReducer,
    turnos : turnosReducer,
    asistencias : asistenciasReducer,
    gastos : gastosReducer,
    combos : combosReducer,
    pedidos : pedidosReducer,
    estados : estadosReducer,
    clientes : clientesReducer,
    usuario : userReducer,
});
