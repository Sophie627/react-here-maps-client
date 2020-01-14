import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HistoryIcon from '@material-ui/icons/History';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import roraso from '../../assets/images/roraso.png';
import Drawer from '@material-ui/core/Drawer';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menu:{
    background: '#4D4D4D'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  profileAvatar: {
    margin: 10,
    margin: 10,
    width: 170,
    height: 170,
    borderRadius: '127px',
    textAlign: 'center'
  },
  welcomeText:{
    position: 'sticky'
  },
  bigAvatar: {
    margin: 10,
    width: 40,
    height: 40,
    borderRadius: '82px',
    left: '100%',
    position: 'sticky'
  },
  bottomClose:{
    top: '100%',
    fontSize: 13,
    position: 'sticky'
  },
  openProfile:{
    left: '100%',
    position: 'sticky'
  },
  buttonsLogged:{
    display: 'contents'
  },
  buttonSizes:{
    height: 50,
    width: 300,
    fontSize: 13,
  }
};

class Header extends React.Component {
    constructor(props, context) {
      super(props, context);
      const { classes } = props;
      this.ProfileOpen = this.ProfileOpen.bind(this)
      this.ProfileClose = this.ProfileClose.bind(this)
      this.state = {
        profile:false,
        redirectLogOut: false,
        redirectHome: false,
        redirectChangePassword : false,
      }
    }
    
    

  slide() {
    window.setInterval(function () {
      // console.log("Intervalo de 3 Seg")
      axios.get('https://roraso.herokuapp.com/User/CurrentUser',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
          .then(res => {
              if(localStorage.getItem('status') === 'offline'){
                localStorage.setItem('status', 'online');
                Swal.fire({
                    title: 'Se volvio a tener conexion',
                    text: 'Entrando en modo Online',
                    type: 'success',
                })
                return window.location.href = "/";
              }
          })
          .catch(err => {
              if(localStorage.getItem('status') === 'online'){
                localStorage.setItem('status', 'offline');
                Swal.fire({
                    title: 'No se detecto conexion',
                    text: 'Entrando en modo Offline',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
              }
          })
      // console.log(this.props);
      // if(localStorage.getItem('status') === 'online'){
      //   this.saveCategories();
      //   this.saveProducts();
      //   this.saveClients();
      //   this.saveStates();
      // }else{
      //   return;
      // }
    }, 7000);
  }
    
  componentWillMount(){
    this.slide();

    if(localStorage.getItem('enviarCat') === null){
      localStorage.setItem('enviarCat', JSON.stringify([]))
    }else{

    }

    axios.get('https://roraso.herokuapp.com/User/CurrentUser',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(localStorage.getItem('status') === 'offline'){
              localStorage.setItem('status', 'online');
              Swal.fire({
                  title: 'Se volvio a tener conexion',
                  text: 'Entrando en modo Online',
                  type: 'success',
              })
              return;
            }
        })
        .catch(err => {
            if(localStorage.getItem('status') === 'online'){
              localStorage.setItem('status', 'offline');
              Swal.fire({
                  title: 'No se detecto conexion',
                  text: 'Entrando en modo Offline',
                  type: 'error',
                  confirmButtonText: 'Reintentar'
              })
              return;
            }
        })
    // console.log(this.props);
    if(localStorage.getItem('status') === 'online'){
      this.saveCategories();
      this.saveProducts();
      this.saveClients();
      this.saveStates();
    }else{
      return;
    }
  }

  returnPreviusPage(){
    window.history.go(-1)
    return false;
  }

    saveCategories = async () => {

      let categories = [];

      if(localStorage.getItem('categorias')){

      const serializedCategory = localStorage.getItem('categorias');
      var deserializedCategory = JSON.parse(serializedCategory);

      }else{

        localStorage.setItem('categorias','[]');

      }

      // console.log(deserializedCategory.length);

      await axios.get('https://roraso.herokuapp.com/Category/Categories',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {

            res.data.map(cat => {
              categories.push(cat)
            })

            // console.log(JSON.parse(localStorage.getItem('enviarCat')).length)

            let arrayCat = JSON.parse(localStorage.getItem('enviarCat'));



            localStorage.setItem('categorias', JSON.stringify(categories))

            if(deserializedCategory.length > res.data.length && deserializedCategory.length !== 0){

              // alert("1")

              if(localStorage.getItem('status') === 'online'){
                
                // alert("2")

                Swal.fire({
                  title: 'Solicitudes Encoladas',
                  text: "Quedan pendientes solicitudes a confirmar, ¿Desea enviarlas ahora?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Enviarlas ahora!'
                }).then((result) => {
                  if (result.value) {
                    
                    let arrayCat = JSON.parse(localStorage.getItem('enviarCat'));

                    console.log(arrayCat.slice(0,1))

                    for (let i = 0; i < JSON.parse(localStorage.getItem('enviarCat')).length; i++) {
                      // const element = array[i];
        
                      let data = {
                        Name : JSON.parse(localStorage.getItem('enviarCat'))[i].Name,
                        Description : JSON.parse(localStorage.getItem('enviarCat'))[i].Description
                      }
        
                      axios.post("https://roraso.herokuapp.com/Category/CreateCategory",data,
                      {headers: { 'access-token': localStorage.getItem('access-token')}})
                      .then(res => {
                          if(res.status === 200){
        
                              Swal.fire({
                                  title: 'Correcto!',
                                  text: 'Se ha añadido una nueva categoria',
                                  type: 'success',
                                  // confirmButtonText: 'Sera Redirigido'
                              })

                          }
                          else{
                              Swal.fire({
                                  title: 'Error!',
                                  text: 'Se ha producido un error al intentar crear la categoria',
                                  type: 'error',
                                  confirmButtonText: 'Reintentar'
                              })
                              return;
                          }
                      })

                      if(i == JSON.parse(localStorage.getItem('enviarCat')).length){
                        // localStorage.removeItem('enviarCat');

                        // window.location.reload(false); 

                      }else{
                        // console.log(i);

                      }
                    }

                    Swal.fire(
                      'Solicitudes enviadas',
                      'Se proceden a actualizar las categorias.',
                      'success'
                    )

                    localStorage.removeItem('enviarCat');

                        // window.location.reload(false); 

                    localStorage.setItem('categorias', JSON.stringify(categories))
                  }
                })

              }else{
                // alert("3")
                return;
              }
  
            }else{
              // alert("4")
            localStorage.setItem('categorias', JSON.stringify(categories))
          
            }


        }).catch(err => {
          // alert(err)
          console.log(err);
        })

      // return 
    }

    saveProducts = async () => {

      let products = [];

      await axios.get('https://roraso.herokuapp.com/Product/Products',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(prod => {
            products.push(prod)
          })

          localStorage.setItem('productos', JSON.stringify(products))

        }).catch(err => {
          console.log(err);
        })

      // return 
    }

    saveClients = async () => {

      let clients = [];

      await axios.get('https://roraso.herokuapp.com/Client/Clients',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(cli => {
            clients.push(cli)
          })

          localStorage.setItem('clientes', JSON.stringify(clients))

        }).catch(err => {
          // console.log(err);
        })

      // return 
    }

    saveStates = async () => {

      let states = [];

      await axios.get('https://roraso.herokuapp.com/Estado/Estados',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(sta => {
            states.push(sta)
          })

          localStorage.setItem('estados', JSON.stringify(states))

        }).catch(err => {
          console.log(err);
        })

      // return 
    }

    componentDidUpdate(){
        // window.addEventListener('mouseup', )

      }
      
      ProfileClose(){
        this.setState({ profile: false})
      }
      
      ProfileOpen(){
        this.setState({ profile : true})
      }
      
      setRedirectToHome = () => {
        this.setState({
          redirectHome: true
        })
      }
      
      ToHome(){
      if (this.state.redirectHome) {
        return <Redirect to='/' />
      }
    }
    
    setRedirectChangePassword = () => {
      this.setState({
        redirectChangePassword: true
      })
    }
    
    ToChangePassword(){
      if (this.state.redirectChangePassword) {
        return <Redirect to='/cambio-clave' />
      }
    }
    
    setRedirectLogOut = () => {
      this.setState({
        redirectLogOut: true
      })
    }
    
    SignOut(){
      // console.log(this.props)
      if (this.state.redirectLogOut) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("categorias");
        localStorage.removeItem("productos");
        return <Redirect to='/login' />
      }
    }
    
    statusConnection = (classes) => {
      if(localStorage.getItem('status') === 'online'){
        return <Button className={classes.buttonSizes} color="inherit" style={{ background: "linear-gradient(to left, #16DB73 0%, #85ECB6 100%)", color: '#f9f9f9' }}>En Linea</Button>
      }else{
        return <Button className={classes.buttonSizes} color="inherit" style={{ background: "linear-gradient(to left, #F193AD 0%, #EE225A 100%)", color: '#f9f9f9' }}>Fuera de Linea</Button>
      }
    }

    buttonLogged(classes){
      switch (this.props.auth.logged) {
        case null:
          return;
          case true:
            return <Button className={classes.buttonSizes} onClick= {this.setRedirectLogOut} color="inherit">Cerrar Sesión</Button>
            case false:
              return <Button className={classes.buttonSizes} color="inherit">Iniciar Sesión</Button>
            }
          };
          
          profileMenu(props){
            const { classes } = props;
            
            return(
              <Drawer align='center' anchor="right" open={this.state.profile} onClose={this.ProfileClose} id="panel">
                  <img src={roraso} className={classes.profileAvatar}  />
                  <p color="inherit" style={{textAlign: "center", marginTop: '40px', marginBottom: '5px'}} className={classes.welcomeText}>Hola {this.props.auth.user.Name}</p>
                  <p color="inherit" style={{textAlign: "center", marginTop: '20px', marginBottom: '20px'}} className={classes.welcomeText}>Panel de Configuracion</p>
                      <Button className={classes.buttonSizes} color="inherit"  onClick= {this.setRedirectToHome}>Inicio</Button>
                  {this.props.auth.logged &&   <Button className={classes.buttonSizes} color="inherit"  onClick= {this.setRedirectChangePassword}>Cambiar Contraseña</Button>}
                  {this.buttonLogged(classes)}
                  {this.statusConnection(classes)}
                  <Button  color="inherit" onClick= {this.ProfileClose} className={classes.bottomClose} >Cerrar</Button>
                  {this.SignOut()}
                  {this.ToChangePassword()}
                  {this.ToHome()}
              </Drawer>
        )
      }
      
      ImageAvatars(props) {
        const { classes } = props;
        return (
          <Button color="inherit" onClick= {this.ProfileOpen} >
            {/* <img src={AvatarVacio} className={classes.bigAvatar}  /> */}
            <MenuIcon />
          </Button>
        );
      }
      
      content(props){
        const { classes } = props;
        return(
          <div className={classes.root}>
          <AppBar position="sticky" className={classes.menu}>
            <Toolbar>
              <Button onClick={this.returnPreviusPage} color="inherit"><HistoryIcon/></Button>
              <Typography variant="h4" style={{textAlign: "center"}} color="inherit" className={classes.grow}>
              {this.props.titulo}
              </Typography>
              {this.ImageAvatars(this.props)}
            </Toolbar>
            {this.profileMenu(this.props)}
          </AppBar>

        </div>
        )
      }
      
      
      render() {
        
        return (
          <div>
        {this.content(this.props)}
    </div>
  );
}

}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
  }; 

export default withStyles(styles)(connect(mapStateToProps,actions)(Header));