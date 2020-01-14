import React, { Component } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

class CambioDeClave extends Component {

  claveActualRef = React.createRef();
  claveNuevaRef = React.createRef();
  repetirClaveNuevaRef = React.createRef();

  state = {
    Password : '',
    claveFinal : ''
  }

  cambiarClave = (e) => {

    e.preventDefault();

    if(this.claveNuevaRef.current.value == this.repetirClaveNuevaRef.current.value){


      const data = {
        Password : this.claveActualRef.current.value,
        NewPassword : this.claveNuevaRef.current.value
      }
  
      // console.log(this.state)
  
      var accessToken =  localStorage.getItem('access-token');
      axios.post("https://roraso.herokuapp.com/User/ChangePassword",data,{headers: {'access-token': accessToken}})
        .then(res => {
          if(res.status === 200){
            Swal.fire({
              title: 'Correcto!',
              text: 'Se han modificado las credenciales del usuario',
              type: 'success'
              
            }, setTimeout(function(){ 
              window.location.href = "http://localhost:3000/";
            }, 3500))
            return;
          }
        }).catch(err => {
          console.log(err)
          Swal.fire({
            title: 'Error!',
            text: 'Hay datos incorrectos en el formulario',
            type: 'error',
            confirmButtonText: 'Reintentar'
          })
          return;
        })


    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Las contraseñas no coinciden',
        type: 'error',
        confirmButtonText: 'Reintentar'
      })
      return;
    }

  }

  render() {

    return (

      <React.Fragment>
            <Header titulo = 'Cambio Contraseña'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.cambiarClave} className="col-5">
                        <div className="form-group">
                            <label>Contraseña Actual</label>
                            <input ref={this.claveActualRef} type="password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Nueva Contraseña</label>
                            <input ref={this.claveNuevaRef} type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Repita Contraseña</label>
                            <input ref={this.repetirClaveNuevaRef} type="password" className="form-control" />
                        </div>
                        <div center="true" align="center" className="form-group">
                            <input type="submit" value="Enviar" className="btn btn-primary"/>
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
    );
  }
}

export default CambioDeClave;