// Ver https://5c507d49471426000887a6a7--react-bootstrap.netlify.com/utilities/transitions/

import React, { Component } from 'react';

//Componentes
import { CustomInput } from 'reactstrap';
import { Tab, Row, Col, Nav, NavItem, Checkbox } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

//Componentes
import Header from '../../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { mostrarRol } from '../../../actions/rolesAction'

class RolIndividual extends Component {

    constructor(...args) {
        super(...args);
  
        this.state = {
            rol : [],
            //User
            UserCreate: false,
            UserView: false,
            UserEdit: false,
            UserDelete: false,
            //Cliente
            ClientCreate: false,
            ClientView: false,
            ClientEdit: false,
            ClientDelete: false,
            //Roles
            RolCreate: false,
            RolView: false,
            RolEdit: false,
            RolDelete: false,
            //Pedidos
            PedidoCreate: false,
            PedidoView: false,
            PedidoEdit: false,
            PedidoDelete: false,
            //Productos
            ProductoCreate: false,
            ProductoView: false,
            ProductoEdit: false,
            ProductoDelete: false,
            //Gastos
            GastoCreate: false,
            GastoView: false,
            GastoEdit: false,
            GastoDelete: false,
            //Permisos
            // Permisos : [],
            // Nombre:''
        };
    }

    componentDidMount(){

        this.props.mostrarRol(this.props.match.params.rolId);

    }

    CargarRoles = async () => {
        
        //Usuario
        this.state.UserCreate = false;
        this.state.UserView= false;
        this.state.UserEdit= false;
        this.state.UserDelete= false;
        //Cliente
        this.state.ClientCreate= false;
        this.state.ClientView= false;
        this.state.ClientEdit= false;
        this.state.ClientDelete= false;
        //Roles
        this.state.RolCreate= false;
        this.state.RolView= false;
        this.state.RolEdit= false;
        this.state.RolDelete= false;
        //Pedidos
        this.state.PedidoCreate= false;
        this.state.PedidoView= false;
        this.state.PedidoEdit= false;
        this.state.PedidoDelete= false;
        //Productos
        this.state.ProductoCreate= false;
        this.state.ProductoView= false;
        this.state.ProductoEdit= false;
        this.state.ProductoDelete= false;
        //Gastos
        this.state.GastoCreate= false;
        this.state.GastoView= false;
        this.state.GastoEdit= false;
        this.state.GastoDelete= false;


        {this.props.rol.Authorizations.map(rol => {

            switch(rol.id){
                  //Usuario
              case 1 :
                  this.state.UserCreate = true; break
              case 2 :
                  this.state.UserView = true; break
              case 3 :
                  this.state.UserEdit = true; break
              case 4 :
                  this.state.UserDelete = true; break
                  //Cliente
              case 5 :
                  this.state.ClientCreate = true; break
              case 6 :
                  this.state.ClientView = true; break
              case 7 :
                  this.state.ClientEdit = true; break
              case 8 :
                  this.state.ClientDelete = true; break
                  //Rol
              case 9 :
                  this.state.RolCreate = true; break
              case 10 :
                  this.state.RolView = true; break
              case 1 :
                  this.state.RolEdit = true; break
              case 12 :
                  this.state.RolDelete = true; break
                  //Pedido
              case 13 :
                  this.state.PedidoCreate = true; break
              case 14 :
                  this.state.PedidoView = true; break
              case 15 :
                  this.state.PedidoEdit = true; break
              case 16 :
                  this.state.PedidoDelete = true; break
                  //Producto
              case 17 :
                  this.state.ProductoCreate = true; break
              case 18 :
                  this.state.ProductoView = true; break
              case 19 :
                  this.state.ProductoEdit = true; break
              case 20 :
                  this.state.ProductoDelete = true; break
                  //Gasto
              case 21 :
                  this.state.GastoCreate = true; break
              case 22 :
                  this.state.GastoView = true; break
              case 23 :
                  this.state.GastoEdit = true; break
              case 24 :
                  this.state.GastoDelete = true; break
              default :
                  return;
            }

        })}
        
    }

    mostrarRol = () => {

        if(this.props.rol == undefined) return null;

        this.CargarRoles();

        return(
            <div className="table-empleados">
            <Paper className="col-md-8">
                <div>
                <form className="col-8">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input value={this.props.rol.Name} disabled type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Descripcion</label>
                        <input value={this.props.rol.Description} disabled type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Permisos</label>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="clearfix">
                            <Col sm={3}>
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="first">Usuarios</NavItem>
                                <NavItem eventKey="second">Clientes</NavItem>
                                <NavItem eventKey="third">Roles</NavItem>
                                <NavItem eventKey="fourth">Pedidos</NavItem>
                                <NavItem eventKey="fifth">Productos</NavItem>
                                <NavItem eventKey="sixth">Gasto</NavItem>
                            </Nav>
                            </Col>
                            <Col sm={8}>
                            <Tab.Content  animation style={{marginLeft: 150}}>
                                {/* Usuarios */}
                                <Tab.Pane eventKey="first">
                                    <CustomInput type="checkbox"
                                        checked={this.state.UserCreate}
                                        id='1'
                                        disabled
                                        label="Crear Usuario" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.UserView}
                                        id='2'
                                        disabled
                                        label="Ver Usuario" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.UserEdit}
                                        id='3'
                                        disabled
                                        label="Modificar Usuario" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.UserDelete}
                                        id='4'
                                        disabled
                                        label="Borrar Usuario" />
                                </Tab.Pane>
                                {/* Clientes */}
                                <Tab.Pane eventKey="second">
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientCreate}
                                        id='5'
                                        disabled
                                        label="Crear Cliente" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientView}
                                        id='6'
                                        disabled
                                        label="Ver Cliente" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientEdit}
                                        id='7'
                                        disabled
                                        label="Modificar Cliente" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientDelete}
                                        id='8'
                                        disabled
                                        label="Borrar Cliente" />
                                </Tab.Pane>
                                {/* Roles */}
                                <Tab.Pane eventKey="third">
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolCreate}
                                        id='9'
                                        disabled
                                        label="Crear Roles" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolView}
                                        id='10'
                                        disabled
                                        label="Ver Roles" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolEdit}
                                        id='11'
                                        disabled
                                        label="Modificar Roles" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolDelete}
                                        id='12'
                                        disabled
                                        label="Borrar Roles" />
                                </Tab.Pane>
                                {/* Pedidos */}
                                <Tab.Pane eventKey="fourth">
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoCreate}
                                        id='13'
                                        disabled
                                        label="Crear Pedidos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoView}
                                        id='14'
                                        disabled
                                        label="Ver Pedidos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoEdit}
                                        id='15'
                                        disabled
                                        label="Modificar Pedidos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoDelete}
                                        id='16'
                                        disabled
                                        label="Borrar Pedidos" />
                                </Tab.Pane>
                                {/* Productos */}
                                <Tab.Pane eventKey="fifth">
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoCreate}
                                        id='17'
                                        disabled
                                        label="Crear Productos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoView}
                                        id='18'
                                        disabled
                                        label="Ver Productos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoEdit}
                                        id='19'
                                        disabled
                                        label="Modificar Productos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoDelete}
                                        id='20'
                                        disabled
                                        label="Borrar Productos" />
                                </Tab.Pane>
                                {/* Gastos */}
                                <Tab.Pane eventKey="sixth">
                                    <CustomInput type="checkbox"
                                        checked={this.state.GastoCreate}
                                        id='21'
                                        disabled
                                        label="Crear Gasto" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.GastoView}
                                        id='22'
                                        disabled
                                        label="Ver Gasto" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.GastoEdit}
                                        id='23'
                                        disabled
                                        label="Modificar Gasto" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.GastoDelete}
                                        id='24'
                                        disabled
                                        label="Borrar Gasto" />
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                        </Tab.Container>
                    </div>
                </form>
                </div>
            </Paper>
            </div>
        );
    }

    render() {

        // if(this.props.rol == undefined) return null;
        if(this.props.rol == undefined) return null;

        return (
          
            <div>
                <Header 
                    titulo = 'Rol'
                />
                {this.mostrarRol()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
  rol : state.roles.rol
})

export default  connect(mapStateToProps, {mostrarRol}) (RolIndividual);