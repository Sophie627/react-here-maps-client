import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';

import StylesLoginForm from '../../assets/css/Login/StylesLoginForm'
var login = require('../../assets/globals/index')
const styles = StylesLoginForm;

 class ChangePassword extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.handlerepeatPassword = this.handlerepeatPassword.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handlenewPassword = this.handlenewPassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkNewPassword =this.checkNewPassword.bind(this);
      this.state = {
          passwordError:false,
          passwordErrorDisplay:'none',
          password: "",
          newPasswordErrorLenght:false,
          newPasswordErrorLenghtDisplay:'none',
          newPasswordErrorEmpty:true,
          newPasswordErrorEmptyDisplay:'none',
          newPasswordError:false,
          newPassword:"",
          repeatPasswordError:false,
          repeatPasswordErrorNotSameDisplay : 'none',
          repeatPasswordErrorEmptyDisplay : 'none',        
          repeatPassword:"",
          buttonText:"Modificar Contraseña ",
          buttonSuccess:false,
          buttonProgress:false,
          buttonClass:'buttonNormal',

      };
    }
    checkRepeatPassword(){
      if(this.state.repeatPassword=== ""){
        this.setState({ repeatPasswordError : true})
       this.setState({ repeatPasswordErrorEmptyDisplay : 'block'})
       this.setState({ repeatPasswordErrorNotSameDisplay : 'none'})
       return false
      }else if (this.state.repeatPassword !== this.state.newPassword){
        this.setState({ repeatPasswordError : true})
        this.setState({ repeatPasswordErrorEmptyDisplay : 'none'})
        this.setState({ repeatPasswordErrorNotSameDisplay : 'block'})
        return false
      }else{
        this.setState({ repeatPasswordError : false})
        this.setState({ repeatPasswordErrorEmptyDisplay : 'none'})
        this.setState({ repeatPasswordErrorNotSameDisplay : 'none'})
        return true
      }
    }
    checkPassword(){
      if(this.state.password=== ""){
       this.setState({ passwordError : true})
       this.setState({ passwordErrorDisplay : 'block'})
       return false
      }else{
        this.setState({ passwordError : false})
       this.setState({ passwordErrorDisplay : 'none'})
       return true
      }
    }
    checkNewPassword(){
      if(this.state.newPassword===""){
        this.setState({newPasswordErrorLenght : true})
        this.setState({newPasswordError : true})
        this.setState({newPasswordErrorEmptyDisplay:'block',})
        this.setState({newPasswordErrorLenghtDisplay:'none'})
        this.setState({newPasswordErrorEmpty : false})

        return false
      }else if(this.state.newPassword.length < 6){
        this.setState({newPasswordErrorLenght : false})
        this.setState({newPasswordErrorEmpty : true})
        this.setState({newPasswordErrorEmptyDisplay:'none'})
        this.setState({newPasswordErrorLenghtDisplay:'block',})
        this.setState({newPasswordError : true})

        return false
      }else{
        this.setState({newPasswordErrorLenght : false})
        this.setState({newPasswordErrorEmpty : true})
        this.setState({newPasswordErrorEmptyDisplay:'none'})
        this.setState({newPasswordErrorLenghtDisplay:'none'})
        this.setState({newPasswordError : false})

        return true
      }

    }

    handlePassword(e) {
      this.setState({ password: e.target.value });
    }
    handlenewPassword(e) {
      this.setState({ newPassword: e.target.value });
    }
    handlerepeatPassword(e) {
      this.setState({ repeatPassword: e.target.value });
    }
    async handleSubmit(e){
      try {
        alert(login.getLogueado)
        let newPassword = this.checkNewPassword();
        let password = this.checkPassword();
        let repeatPassword = this.checkRepeatPassword();
        if( newPassword && password &&repeatPassword ){

            if(this.state.newPassword === this.state.repeatPassword){
                this.setState({repeatPasswordError : false})
                var data= {
                  Password : this.state.password,
                  NewPassword :this.state.newPassword
                }

              try {
                var accessToken =  localStorage.getItem('access-token');
                this.setState(
                  {
                    buttonSuccess: false,
                    buttonProgress: true,
                  },)
                const res = await axios.post("http://localhost:1337/User/ChangePassword",data,{headers: {'access-token': accessToken}});
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
                    }, 2000);               
                  })

                } catch (error) {
                  alert(JSON.stringify(error.response))
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
                        buttonText: "Modificar Contraseña",
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
                        buttonText: "Modificar Contraseña",
                        buttonClass:'buttonNormal'
                      });
                    }, 3000)
                  })
                }
              } 
            }
        }  
         
      } catch (error) {
          alert("we")
      }
 }

    render() {
      const { classes } = this.props;
        return (
      <Grid container spacing={24}>
        
         
          <Grid item xs={1} md={3} lg={4}>
          </Grid>
          <Grid item xs={10} md={6} lg={4} >
          <React.Fragment>
              <CssBaseline />
              <main >
                <Paper className={classes.paper}>
                  <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Contraseña Actual</InputLabel>
                      <Input
                        id="passwordActual"
                        type="password"
                        value={this.state.Password}
                        placeholder="*********"
                        onChange={this.handlePassword}
                        autoComplete="current-password"
                        error={this.state.passwordError}
                      />
                      </FormControl>
                      <FormHelperText error={this.state.passwordError}style={{display:this.state.passwordErrorDisplay}}>Este campo es obligatorio</FormHelperText>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Nueva Contraseña</InputLabel>
                      <Input
                        id="newPassword"
                        type="password"
                        value={this.state.newPassword}
                        placeholder="*********"
                        onChange={this.handlenewPassword}
                        autoComplete="current-password"
                        error={this.state.newPasswordError}
                      />
                    <FormHelperText error={!this.state.newPasswordErrorEmpty} filled={false} style={{display:this.state.newPasswordErrorEmptyDisplay}}>Este campo es obligatorio</FormHelperText>
                    <FormHelperText error={!this.state.newPasswordErrorLenght} filled={false} style={{display:this.state.newPasswordErrorLenghtDisplay}}>La contraseña debe tener un minimo de 6 numeros o letras</FormHelperText>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Repetir Contraseña</InputLabel>
                      <Input
                        id="repeatPassword"
                        type="password"
                        value={this.state.repeatPassword}
                        placeholder="*********"
                        onChange={this.handlerepeatPassword}
                        autoComplete="current-password"
                        error={this.state.repeatPasswordError}
                      />
                    <FormHelperText error={this.state.repeatPasswordError} filled={false} style={{display:this.state.repeatPasswordErrorEmptyDisplay}}>Este campo es obligatorio</FormHelperText>
                    <FormHelperText error={this.state.repeatPasswordError} filled={false} style={{display:this.state.repeatPasswordErrorNotSameDisplay}}>Las contraseñas no son iguales</FormHelperText>
                    </FormControl>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={this.state.buttonClass}
                      onClick= {this.handleSubmit}
                      disabled={this.state.buttonProgress}
                    >
                      {this.state.buttonText}
                      {this.state.buttonProgress && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>
                    
                  </form>
                </Paper>
              </main>
            </React.Fragment>
          </Grid>
          <Grid item xs={1} md={3} lg={4}>         
          </Grid>          
        </Grid>
        )
      }
}
ChangePassword.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(ChangePassword);