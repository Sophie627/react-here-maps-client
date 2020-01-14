
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import StylesLoginForm from '../../assets/css/Login/StylesLoginForm'
import CircularProgress from '@material-ui/core/CircularProgress';
var login = require("../../assets/globals/index");
const styles = StylesLoginForm;

class SignInForm extends Component {

    constructor(props, context) {
      super(props, context);
  
      this.handleDni = this.handleDni.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleSubmiit = this.handleSubmiit.bind(this);
      this.state = {
        Dni: '',
        Password:'',
        buttonSuccess:false,
        buttonProgress:false,
        buttonClass:'buttonNormal',
        buttonText:"Ingresar al sistema ",
      };
    }
  
    handleDni(e) {
      this.setState({ Dni: e.target.value });
 
    }

    handlePassword(e) {
        this.setState({ Password: e.target.value });
      }
    async handleSubmiit(e){

      alert(login.setLogueado(true))

         try {
             if(this.state.Dni !== '' && this.state.Password !== ''){
                 var data = {
                     Dni:this.state.Dni,
                     Password:this.state.Password
                 }
             try {
              this.setState(
                {
                  buttonSuccess: false,
                  buttonProgress: true,
                },)
                 const res = await axios.post("http://localhost:1337/User/login",data);
                 this.setState(
                   {
                     buttonSuccess: false,
                     buttonProgress: true,
                   },
                   () => {
                     this.timer = setTimeout(() => {

                       this.setState({
                         buttonProgress: false,
                         buttonSuccess: true,
                         buttonText: res.data.message,
                         buttonClass:'buttonSucess'
                       });
                       window.location.replace('/modulo')
                     }, 2000);               
                   })
                 localStorage.setItem('access-token', res.data.token);
                } catch (error) {
                if(error.response){
                  this.setState({

                    buttonProgress: false,
                    buttonSuccess: true,
                    buttonText: error.response.data.error,
                    buttonClass:'buttonAlert'
                   },
                 () => {
                  this.timer = setTimeout(() => {
                     this.setState({
                       buttonProgress: false,
                      buttonSuccess: true,
                      buttonText: "Usuario Logueado",
                       buttonClass:'buttonNormal'
                     });
                  }, 3000)
                }
                )
              }else{
                this.setState({

                  buttonProgress: false,
                  buttonSuccess: true,
                  buttonText: "Error en el servidor intente mas tarde",
                  buttonClass:'buttonAlert'
                 }, () => {
                   this.timer = setTimeout(() => {
                    this.setState({
                       buttonProgress: false,
                       buttonSuccess: true,
                       buttonText: "Ingresar al sistema",
                       buttonClass:'buttonNormal'
                     });
                }, 3000)
                 }
                )
              }
             } 
             
             }else{
                alert("error")
                 return 'warning'
                 
             }
         } catch (error) {
             alert(error)
         }
    }

    render() {
      
      const { classes } = this.props;

        return (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>

                <Typography component="h1" variant="h5">
                  Iniciar Sesión
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email" >DNI</InputLabel>
                    <Input 
                      type="string"
                      value={this.state.Dni}
                      placeholder="Documento Nacional de Identidad"
                      onChange={this.handleDni}/>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <Input
                      type="password"
                      value={this.state.Password}
                      placeholder="*********"
                      onChange={this.handlePassword}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordarme"
                  />
                  <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={this.state.buttonClass}
                      onClick= {this.handleSubmiit}
                      disabled={this.state.buttonProgress}
                    >
                    {this.state.buttonText}
                    {this.state.buttonProgress && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </Button>
                  
                </form>
              </Paper>
            </main>
          </React.Fragment>
      );
    }
  }

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInForm);