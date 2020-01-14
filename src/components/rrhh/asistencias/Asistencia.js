import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Modal, Button, Row, Col, Panel } from 'react-bootstrap';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

//Redux
import { connect } from 'react-redux';
import { eliminarAsistencia } from '../../../actions/asistenciasAction'

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 130,
};

const tableStyle = {
    marginTop: 20,
    maxWidth: '100%',
    minWidth: '100%'
}

class MyVerticallyCenteredModal extends Component {

    constructor(...args) {
      super(...args);
    }

    eliminarAsistencia = (id) => {
        // console.log(id)

        axios.post("https://roraso.herokuapp.com/Asisstance/Delete",{'id': id},
        { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha borrado una asistencia',
                    type: 'success',
                    confirmButtonText: 'Sera Redirigido'
                })
                setTimeout(function(){ 
                    window.location.href = "http://localhost:3000/rrhh/asistencias";
                }, 3500);
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Se ha producido un error al intentar borrar la asistencia',
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
        
    // console.log(this.props)
  
        let verificarDatos = () =>{
            if(this.props.asistencias.length === 0){
                return (<h2 align='center'>No hay datos</h2>)
            }else{
                
                return(
                    <React.Fragment>
                        {this.props.asistencias.map(asistencia => (
                        <React.Fragment key={asistencia.id}>
                            <Col xs={12} md={6}>
                            <div align="center" className="form-group">
                                <label>Entrada</label>
                                <h3>{asistencia.InTime}</h3>
                            </div>
                            </Col>
                            <Col align="center" xs={12} md={6}>
                            <div className="form-group">
                                <label>Salida</label>
                                <h3>{verificarOutTime(asistencia.OutTime)}</h3>
                            </div>
                            </Col>
                            <Col align="center" xs={12} md={12} style={{marginTop:'20px',marginBottom:'40px'}}>
                            <Link className={buttonStyle} style={{color:"white", backgroundColor: "#4D4D4D"}} to={{
                                pathname : `/rrhh/asistencias/${asistencia.id}`,
                                state : asistencia,
                                idUser : this.props.asistenciaid,
                                userName : this.props.asistencianame
                                }} className="btn">
                                Editar Asistencia
                            </Link>
                            <button style={buttonStyle} name="idEliminarAsistencia" onClick={() => this.eliminarAsistencia(asistencia.id)} value={asistencia.id} type="button" className="btn btn-danger">Borrar Asistencia</button>
                            </Col>
                        </React.Fragment>

                        ))}
                    </React.Fragment>
                )
            }
        }

        let verificarOutTime = (asistencia) =>{
            if(asistencia === ''){
                return "No hay datos"
            }else{
                return asistencia
            }
            // console.log(asistencia)
        }
  
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered="true"
          style={{marginTop: '100px'}}
        >
          <Modal.Header closeButton>
            <Modal.Title align='center' id="contained-modal-title-vcenter">
              Asistencias Asignadas
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row className="show-grid">

                {verificarDatos()}
                
              </Row>
          </Modal.Body>
          <Modal.Footer>
          <Col xs={12} md={12}>
            <Button onClick={this.props.onHide}>Cerrar</Button>
          </Col>
          </Modal.Footer>
        </Modal>
      );
    }
  }

class Asistencias extends Component {

    constructor(...args) {
    super(...args);

        this.state = {
            modalShow: false
        }

    }

    componentWillUpdate(){
        // console.log(this.props);
    }

    eliminarAsistencia = () =>{
        const {id} = this.props.info;

        this.props.eliminarAsistencia(id);
    }

    render() {
        const {Name, LastName} = this.props.info

        let modalClose = () => this.setState({ modalShow: false });

        // console.log(this.props.info)

        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle} >{Name}</td>
                <td style={tableStyle} >{LastName}</td>
                <td style={tableStyle} >{this.props.info.Assistance.length}</td>
                <td style={columnButtonStyle}>
                    {/* {console.log(this.props.info.Name)} */}
                    <MyVerticallyCenteredModal
                      show={this.state.modalShow}
                      onHide={modalClose}
                      asistenciaid={this.props.info.id}
                      asistencias={this.props.info.Assistance}
                      asistencianame={this.props.info.Name}
                    //   borrarasistencia={this.props.eliminarAsistencia()}
                    />

                    <Button
                        style={buttonStyle}
                        className="btn btn-primary"
                        variant="primary"
                        onClick={() => this.setState({ modalShow: true })}
                      >
                        Ver Asistencias
                    </Button>

                    {/* <Link style={buttonStyle} to={{
                        pathname : `/rrhh/empleados`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link> */}

                    {/* <Link style={buttonStyle} to={{
                        pathname : `/rrhh/editar-empleados`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link> */}

                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarAsistencia}) (Asistencias);