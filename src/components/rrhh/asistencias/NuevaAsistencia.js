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
import { agregarAsistencia } from '../../../actions/asistenciasAction';

//CSS
import '../../../assets/css/empleados/form-alta-empleados.css';

class NuevaAsistencia extends Component {

    state = {
        timeIn : '',
        timeOut : '999999999',
        error : false,
        empleados : []
    }

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

    crearAsistencia = (e) => {

        e.preventDefault();

        // const dateIn = (new Date(this.state.timeIn).getTime()/1000|0);
        // const dateOut = (new Date(this.state.timeOut).getTime()/1000|0);

        if(this.empleadosRef.current.value == "None"){
            Swal.fire({
                title: 'Error!',
                text: 'La asistencia tiene que estar asignada a un usuario',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }

        // if(dateOut < dateIn){
        //     Swal.fire({
        //         title: 'Error!',
        //         text: 'La fecha / hora de salida no puede ser anterior a la de entrada',
        //         type: 'error',
        //         confirmButtonText: 'Reintentar'
        //     })
        //     return;
        // }

        this.setState.timeIn = this.state.timeIn.split("-");
        this.setState.timeOut = this.state.timeOut.split("-");

        var timeIn2 = this.state.timeIn.split("T");

        var timeOut2 = this.state.timeOut.split("T");

        var timeIn3 = timeIn2[0].split('-')

        var timeOut3 = timeOut2[0].split('-')

        var timeIn4 = timeIn3[2] + '/' + timeIn3[1] + '/' + timeIn3[0];

        var timeOut4 = timeOut3[2] + '/' + timeOut3[1] + '/' + timeOut3[0]

        const timeIn5 = timeIn4 + " " + timeIn2[1] + ":00:00";
       
        const timeOut5 = timeOut4 + " " + timeOut2[1] + ":00:00";

        const asistencias = {
            user : this.empleadosRef.current.value,
            timeIn : timeIn5,
            // timeOut : timeOut5
        }

        // console.log(asistencias);

        
        this.props.agregarAsistencia(asistencias);


        e.currentTarget.reset();

    }

    render() {
        return (
            
        <div>
            <Header titulo = 'Alta de Asistencia'/>
            <div className="table-empleados">
                <Paper className="col-md-8">
                    <div>
                    <form onSubmit={this.crearAsistencia} className="col-8">
                        <div className="form-group">
                            <label>Empleado</label>
                            <select ref={this.empleadosRef} className="form-control" required>
                                <option defaultValue="None">None</option>
                                
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
                                <InputGroup.Addon>Fecha y Hora Entrada</InputGroup.Addon>
                                <FormControl onChange={this.handleChangetimeIn} name="timeIn" style={{width: 200}} type="datetime-local" required/>
                                </InputGroup>
                                <InputGroup>
                                <InputGroup.Addon>Fecha y Hora Salida</InputGroup.Addon>
                                <FormControl onChange={this.handleChangetimeOut} disabled name="timeOut" style={{width: 200}} type="datetime-local" required/>
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
    asistencias : state.asistencias.asistencias
});

export default connect(mapStateToProps, {agregarAsistencia})(NuevaAsistencia);