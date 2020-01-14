import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

class ClienteIndividual extends Component {

    state = {
        date : ''
    }

    
    componentDidMount(){
        console.log(this.props);

    }

    render() {

        // console.log(this.props)

        return (
            
        <React.Fragment>
            <Header titulo = 'Ver Cliente'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form className="col-5">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input disabled defaultValue={this.props.location.state.Name} type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input disabled defaultValue={this.props.location.state.LastName} type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input disabled defaultValue={this.props.location.state.Email} type="email" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Telefono</label>
                            <input disabled defaultValue={this.props.location.state.Phone} type="number" min="1" step="1" title="Numbers only" className="form-control" required/>
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }

}

export default ClienteIndividual;