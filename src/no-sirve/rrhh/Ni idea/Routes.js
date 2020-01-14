import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Empleados from './Lista/Empleados';

class Routes extends Component {
    
    state = {
        users : []
    }

    componentDidMount(){
        this.ObtenerEmpleados();
    }

    ObtenerEmpleados = async () => {
        var accessToken =  localStorage.getItem('access-token');
        
        const headers = {
            'access-token': accessToken
        }

        await axios.get('http://localhost:1337/User/users', { headers })
            .then(res => {
                this.setState({
                    users : res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    borrarEmpleado = (id) => {
        console.log('id es: '+id);
    }

    render() { 
        return ( 
            // <Router>

            //     <Switch>
            //         <Route path="/" exact component={Home} />
            //         <Route path="/rrhh" exact render={ () => (
            //             <Empleados 
            //                 empleados = {this.state.users}
            //             />
            //         )} />
            //     </Switch>

            // </Router>
            <div>
                <Empleados 
                    empleados = {this.state.users}
                    borrarEmpleado = {this.borrarEmpleado}
                />
                
            </div>

         );
    }
}
 
export default Routes;