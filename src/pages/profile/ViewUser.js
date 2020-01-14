import React, {Component} from 'react';
import axios from 'axios';
import {DropdownButton,MenuItem,Button,FormGroup,FormControl,HelpBlock,ControlLabel} from 'react-bootstrap';
import StylesLoginForm from '../../assets/css/Login/StylesLoginForm';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';

import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'


const styles = StylesLoginForm;
var idUser = "";
var UserInd = "";
class ViewUser extends Component {
  constructor(props, context) {

    var currentLocation = window.location.pathname;
    var url_array = currentLocation.split('/');
    idUser = url_array[2];
    
    // alert(idUser);

    super(props, context);

      this.handleDni = this.handleDni.bind(this);
      this.handleEmail = this.handleEmail.bind(this);
      this.handleRol = this.handleRol.bind(this);
      this.handleLastName = this.handleLastName.bind(this);
      this.handleName =this.handleName.bind(this);
      this.handleUser = this.handleUser.bind(this);
      
      this.state = 
      {
        user:{
              Dni: '',
              Email:'',
              rol:'',
              LastName:'',
              Name:'',
              PrimaryPhone:'',
              SecondaryPhone:'',              
      },
      idUser: idUser,
      rols:[]
    }
  }

  

  async componentDidMount() {
      var accessToken =  localStorage.getItem('access-token');
      // console.log(accessToken)
      await  axios.get('http://localhost:1337/Rol/rols',
        {headers: {'access-token': accessToken}})
          .then(res => {
            const rols = res.data;
            this.setState({rols : rols});
            
          })

      await  axios.get('http://localhost:1337/User/User?id='+idUser,
      {headers: {'access-token': accessToken}})
        .then(res => {
          const user = res.data.user;
          
          var usuario = JSON.stringify(user);
          // console.log("asd"+usuario);
          // alert(usuario);
          this.setState({user : user});
        });


        
  }

  handleRol(e){
    this.setState({ rol: e.target.value });
  }

  handleUser(e){
    this.setState({ idUser: e.target.value });
  }

  handleDni(e) {
    this.setState({ user:{Dni : e.target.value }});

  }
    handleLastName(e){
      this.setState({ LastName: e.target.value });
    }

    handleName(e){
      this.setState({ Name: e.target.value });
    }

    handleEmail(e) {
        this.setState({ Email: e.target.value });
    }
    
   rolsList() {
    // console.log(this.state.rols)
    const rols = this.state.rols
    // console.log("roles"+rols)
    const listRols = rols.map((rol) =>
    <option disable={true} value={rol.id}>{rol.Name}</option>
    );

    return (
    <FormGroup controlid="formControlsSelect">
    <ControlLabel>Select</ControlLabel>
      <FormControl
      controlid="formControlsSelect"
      componentClass="select" placeholder="select"
      value={this.state.rol}
      placeholder="Enter text"
      onChange={this.handleRol}>
        <option value="">Seleccionar Rol</option>
        {listRols} 
      </FormControl>
      </FormGroup>
    );

  }

 
  render() {

    const { classes } = this.props;

    return (
      
      <ul>
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                  
                </Typography>
                <form className={classes.form}>
          <FormGroup>
            <ControlLabel>Dni</ControlLabel>        
            <FormControl
              type="string"
              value={this.state.user.Dni}
              readOnly={this.handleDni}
              disabled={true}
            />
           </FormGroup>
           <FormGroup>
            <ControlLabel>Nombre</ControlLabel>        
            <FormControl
              type="string"
              value={this.state.user.Name}
              readOnly={this.handleName}
              disabled={true}
            />
           </FormGroup>
           <FormGroup>
            <ControlLabel>Apellido</ControlLabel>        
            <FormControl
              type="string"
              value={this.state.user.LastName}
              readOnly={this.handleLastName}
              disabled={true}
            />
           </FormGroup>
          <FormControl.Feedback />
          <ControlLabel>Email</ControlLabel>
          <FormGroup>
          <FormControl
            type="email"
            value={this.state.user.Email}
            readOnly={this.handleEmail}
            disabled={true}
          />
          </FormGroup>   
          {this.rolsList()}
          <FormControl.Feedback />
          <FormGroup>
            <ControlLabel>Direcciòn</ControlLabel>        
            <FormControl
              type="string"
              value={this.state.user.Adress}
              readOnly={this.handleAdress}
              disabled={true}
            />
           </FormGroup>
          <FormControl.Feedback />
          <FormGroup>
            <ControlLabel>Departamento</ControlLabel>        
            <FormControl
              type="string"
              value={this.state.user.Department}
              readOnly={this.handleDepartment}
              disabled={true}
            />
           </FormGroup>
          <FormControl.Feedback />
          <FormGroup>
            <ControlLabel>Piso</ControlLabel>        
            <FormControl
              type="string"
              value={this.state.Floor}
              readOnly={this.handleFloor}
              disabled={true}
            />
           </FormGroup>
          <FormControl.Feedback />
          <FormGroup>
            <ControlLabel>Telefono</ControlLabel>        
            <FormControl
              type="string"
              value={this.state.user.PrimaryPhone}
              readOnly={this.handlePrimaryPhone}
              disabled={true}
            />
           </FormGroup>
          <FormControl.Feedback />
          </form>
              </Paper>
            </main>
          </React.Fragment>
      </ul>
    )
  }
}

ViewUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewUser);