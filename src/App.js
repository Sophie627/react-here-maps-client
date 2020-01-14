/*Importo componentes y funciones*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import axios from 'axios'

/*Importo Views*/
import Routes from './Routes';
import Login from './components/login/Login';

//CSS
import Swal from 'sweetalert2'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      // state : store.getState()
    };
  }

  componentDidMount() {

    console.log(this.props.auth.logged);

    axios.get('https://roraso.herokuapp.com/User/CurrentUser',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          if(res.status === 200){
            localStorage.setItem('status', 'online');
          }else{
            localStorage.setItem('status', 'offline');
          }
        })
        .catch(err => {
            localStorage.setItem('status', 'offline');
        })


    this.props.fetchCurrentUser();
    // console.log()
  }

  render() {
      if(this.props.auth.logged == "null" || this.props.auth.logged == null || this.props.auth.logged === "null" || this.props.auth.logged === null || this.props.auth.logged == "false" || this.props.auth.logged == false || this.props.auth.logged === "false" || this.props.auth.logged === false){
        return <Login/>;
      }
      else{
        return (
          <Routes />
        );
      }
    }
  }

  function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
  };

export default connect(mapStateToProps, actions)(App);