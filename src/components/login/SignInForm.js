//Redux
import { connect } from 'react-redux';
import { loginUser } from '../../actions/usuarioAction';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import StylesLoginForm from '../../assets/css/Login/StylesLoginForm'
// var login = require("../../assets/globals/index");

const styles = StylesLoginForm;

class SignInForm extends Component {

    constructor(props, context) {
      super(props, context);
  
      this.state = {
        Dni: '',
        Password:'',
        buttonSuccess:false,
        buttonProgress:false,
        buttonClass:'buttonNormal',
        buttonText:"Ingresar al sistema ",
      };
    }

    dniRef = React.createRef();
    claveRef = React.createRef();
  
    signIn = (e) => {

      e.preventDefault();

      const usuario = {
        Dni : this.dniRef.current.value,
        Password : this.claveRef.current.value,
      }

      this.props.loginUser(usuario)
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
                <form onSubmit={this.signIn} className={classes.form}>
                  <div className="form-group">
                      <label>DNI</label>
                      <input ref={this.dniRef} placeholder="Nº de DNI" type="text" className="form-control"/>
                  </div>
                  <div className="form-group">
                      <label>Contraseña</label>
                      <input ref={this.claveRef} placeholder="*******" type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Enviar" className="btn btn-primary"/>
                  </div>
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

export default withStyles(styles)(connect(null, { loginUser })(SignInForm));