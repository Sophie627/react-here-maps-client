import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

//Redux
import { connect } from 'react-redux';
import { eliminarGasto } from '../../actions/gastosAction';

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

const tableStyle = {
    marginTop: 20,
    maxWidth: '100%',
    minWidth: '100%'
}

class Gasto extends Component {

    state = {
        currentUser : ''
    }

    componentWillMount(){
        axios.get('https://roraso.herokuapp.com/User/CurrentUser',
        { headers: { 'access-token': localStorage.getItem('access-token')}})
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        currentUser : res.data.User.Id
                    })
                }
            })
            .catch(err => {
                
                localStorage.setItem('status', 'offline');

                Swal.fire({
                    title: 'No se detecto conexion',
                    text: 'Entrando en modo Offline',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
            })
        // console.log(this.props);
    }

    eliminarGasto = () => {
        this.props.eliminarGasto(this.props.info.id);
    }

    render() {
        const { Details, Amount, Date, id } = this.props.info
        // console.log(this.props.info)
        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle} >{Details}</td>
                <td style={tableStyle} >$ {Amount}</td>
                <td style={tableStyle} >{Date}</td>
                <td style={columnButtonStyle}>
                    <Link style={buttonStyle} to={{
                        pathname : `/gastos/${id}`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link style={buttonStyle} to={{
                        pathname : `/gastos/editar-gasto/${id}`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    <button style={buttonStyle} onClick={ this.eliminarGasto } type="button" className="btn btn-danger">Borrar</button>
                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarGasto}) (Gasto);