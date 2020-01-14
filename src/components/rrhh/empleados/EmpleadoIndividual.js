import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Modal, Button, Row, Col, Panel } from 'react-bootstrap';
import { Container } from 'reactstrap';

//Animacion CSS
import Swal from 'sweetalert2'


//Componentes
import Header from '../../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { eliminarEmpleado, mostrarEmpleado, agregarDireccion } from '../../../actions/empleadosAction'



class MyVerticallyCenteredModal extends Component {

  constructor(...args) {
    super(...args);
  }

  direccionRef = React.createRef();
  departamentoRef = React.createRef();
  pisoRef = React.createRef();
  cpRef = React.createRef();

  crearDireccion = (e) => {

    e.preventDefault();

    const userid = parseInt(this.props.userid);

    const data = {
      Address : {
        Adress : this.direccionRef.current.value,
        Department : this.departamentoRef.current.value,
        Floor : this.pisoRef.current.value,
        Cp : this.cpRef.current.value,
        LatLong : '1111',
        User : userid
      }
    }

    // console.log(data);

    axios.post("https://roraso.herokuapp.com/User/AddAddress",data,
    {headers: { 'access-token': localStorage.getItem('access-token')}})
    .then(res => {
      if(res.status === 200){
        Swal.fire({
            title: 'Correcto!',
            text: 'Se ha agregado una direccion',
            type: 'success',
            confirmButtonText: 'Se refrescara la pagina'
        })
        setTimeout(function(){ 
          window.location.reload();
        }, 3500);
      }
      else{
        Swal.fire({
            title: 'Error!',
            text: 'Se ha producido un error al intentar agregar una direccion',
            type: 'error',
            confirmButtonText: 'Reintentar'
        })
        return;
      }
    })
    .catch(err => {
      Swal.fire({
          title: 'Error!',
          text: 'El Servidor no ha respondido la solicitud',
          type: 'error',
          confirmButtonText: 'Reintentar'
      })
      return;
    })
  }

  render() {

    // console.log(this.props);

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered="true"
        style={{marginTop: '100px'}}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ingresar Datos de Direccion
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.crearDireccion} className="col-8">
        <Modal.Body>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <div className="form-group">
                    <label>Direccion</label>
                    <input ref={this.direccionRef} type="text" className="form-control" />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                     <label>Piso</label>
                     <input ref={this.pisoRef} type="text" className="form-control" />
                 </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                    <label>Departamento</label>
                    <input ref={this.departamentoRef} type="text" className="form-control" />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                    <label>Codigo Postal</label>
                    <input ref={this.cpRef} type="text" className="form-control" />
                </div>
              </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
        <Col xs={12} md={1}>
          <Button type="submit">Cargar</Button>
        </Col>
        <Col xs={12} md={11}>
          <Button onClick={this.props.onHide}>Cerrar</Button>
        </Col>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

class EmpleadoIndividual extends Component {

    constructor(...args) {
    super(...args);

        this.state = {
            empleado : [],
            modalShow: false
        }

    }

    eliminarEmpleado = () =>{
      this.props.eliminarEmpleado(this.props.match.params.empleadoId);
    }

    componentDidMount(){
      this.props.mostrarEmpleado(this.props.match.params.empleadoId);

      // console.log(this.props.empleado); Me da vacio porque la respuesta de la api carga dsp que el didmount
    }

    componentWillReceiveProps(nextProps, nextState) {
        // console.log(nextProps.empleado);
    }

    mostrarEmpleado = () => {

      if(this.props.empleado == undefined) return null;

      console.log(this.props.empleado);

      return (
          <React.Fragment>
            <Container style={{marginTop:10}}>
              <Panel bsStyle="info">
              <Panel.Heading>
                    <Panel.Title componentClass="h3" style={{textAlign:'center'}}>Datos Personales</Panel.Title>
                  </Panel.Heading>
                
                  <Panel.Body xs={4}><h2 xs={4}>Nombre: {this.props.empleado.user.Name}</h2>
                  <h2 xs={4}>Apellido: {this.props.empleado.user.LastName}</h2>
                  <h2>Email: {this.props.empleado.user.Email}</h2>
                  <h2>DNI: {this.props.empleado.user.Dni}</h2>
                  <h2>Rol: {this.props.empleado.user.Rols}</h2></Panel.Body>
              
              <Panel.Heading>
                    <Panel.Title componentClass="h3" style={{textAlign:'center'}}>Domicilios</Panel.Title>
                  </Panel.Heading>
             
                  {this.props.empleado.user.Adress.map(address => (
                    <React.Fragment key = {address.id}>
                    
                  <Panel.Body key = {address.id}><h2>Domicilio: {address.Adress}</h2>
                  <h2>Piso: {address.Floor}</h2>
                  <h2>Departamento: {address.Department}</h2>
                  <h2>Codigo Postal: {address.Cp}</h2>
                  </Panel.Body><Panel.Body></Panel.Body>
                  </React.Fragment>
                      // console.log(address)
                  ))}
                  {/* <Col xs={4}><h2>Rol: {this.props.empleado.user.Rols}</h2></Col> */}
                  </Panel>
            </Container>
          </React.Fragment>
      );
    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });

        if(this.props.empleado == undefined) return null;

        return (
          
            <div>
                <Header 
                    titulo = 'Empleado'
                />
                {this.mostrarEmpleado()}
                <React.Fragment>
                    <Link to={{
                        pathname : `/rrhh/editar-empleados/${this.props.match.params.empleadoId}`,
                        state : this.props.empleado.user
                        }} className="btn btn-warning">
                            Editar
                    </Link>

                    <button onClick={ this.eliminarEmpleado } type="button" className="btn btn-danger">Borrar</button>

                    <Button
                      className="btn btn-success"
                      variant="primary"
                      onClick={() => this.setState({ modalShow: true })}
                      >
                      Agregar Direccion
                    </Button>

                    <Link to={{
                        pathname : `/rrhh/roles/${this.props.empleado.user.Rols}`
                        }} className="btn btn-info"
                        variant="info">
                            Permisos
                    </Link>

                    {/* <Button
                      className="btn btn-info"
                      variant="info"
                      >
                      Permisos
                    </Button> */}

                    <MyVerticallyCenteredModal
                      show={this.state.modalShow}
                      onHide={modalClose}
                      userid={this.props.match.params.empleadoId}
                    />

                </React.Fragment>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  empleado : state.empleados.empleado
})

export default  connect(mapStateToProps, {eliminarEmpleado, mostrarEmpleado}) (EmpleadoIndividual);