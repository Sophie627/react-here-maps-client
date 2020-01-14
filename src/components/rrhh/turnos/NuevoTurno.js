import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2'
import axios from 'axios'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
import ListadoEmpleados from './ListadoEmpleados';

//Redux
import { connect } from 'react-redux';
import { agregarTurno } from '../../../actions/turnosAction';

//CSS
import '../../../assets/css/empleados/form-alta-empleados.css';

class NuevoTurno extends Component {

    state = {
        timeIn : '--:--',
        timeOut : '--:--',
        error : false,
        empleados : []
    }

    nombreRef = React.createRef();
    empleadosRef = React.createRef();
    timeIn = React.createRef();
    timeOut = React.createRef();

    componentWillMount(){

        axios.get('https://roraso.herokuapp.com/User/Users',
        { headers: { 'access-token': localStorage.getItem('access-token')}})
            .then(res => {
                if(res.data.length === 0){
                    return null;
                }else{
                    this.setState({
                        empleados : res.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleChangetimeIn = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChangetimeOut = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    crearTurno = (e) => {

        e.preventDefault();

        const timeIn = this.state.timeIn.split(":");
        const timeOut = this.state.timeOut.split(":");

        const turnos = {
            nombre : this.nombreRef.current.value,
            user : this.empleadosRef.current.value,
            inhour : timeIn[0],
            inmin : timeIn[1],
            outhour : timeOut[0],
            outmin : timeOut[1]
        }

        // console.log(this.props);

        console.log(turnos);

        if(turnos.nombre === '' || turnos.user === '' || 
        turnos.hourIn === '--' || turnos.minuteIn === '--' || 
        turnos.hourOut === '--' || turnos.minuteOut === '--' ){
            // console.log('error');
            this.setState({error : true});
            Swal.fire({
                title: 'Error!',
                text: 'Faltan o hay errores en el formulario',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }else{
            this.setState({error : false});
            // console.log(turnos);
            this.props.agregarTurno(turnos)
            // this.props.agregarEmpleado(empleado);
        }

        e.currentTarget.reset();

    }

    render() {
        return (
            
        <div>
            <Header titulo = 'Alta de Turno'/>
            <div className="table-empleados">
                <Paper className="col-md-8">
                    <div>
                    <form onSubmit={this.crearTurno} className="col-8">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input ref={this.nombreRef} placeholder="Mañana - Tarde - Noche" type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Empleado</label>
                            <select ref={this.empleadosRef} className="form-control">
                                <option defaultValue>None</option>
                                
                                {this.state.empleados.map(empleado => (
                                    <ListadoEmpleados
                                        key = {empleado.id}
                                        empleados = {empleado}
                                    />
                                ))}
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Horarios</label>
                            <FormGroup style={{display: 'flex', justifyContent: 'space-between'}}>
                                <InputGroup>
                                <InputGroup.Addon>Horario Inicio</InputGroup.Addon>
                                <FormControl onChange={this.handleChangetimeIn} name="timeIn" style={{width: 200}} type="time" />
                                </InputGroup>
                                <InputGroup>
                                <InputGroup.Addon>Horario Fin</InputGroup.Addon>
                                <FormControl onChange={this.handleChangetimeOut} name="timeOut" style={{width: 200}} type="time" />
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div align="center" className="form-group">
                            <input type="submit" value="Enviar" className="btn btn-primary"/>
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    turnos : state.turnos.turnos
});

export default connect(mapStateToProps, {agregarTurno})(NuevoTurno);