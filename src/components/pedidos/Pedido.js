import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarEmpleado } from '../../actions/empleadosAction';

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

class Pedido extends Component {

    // eliminarEmpleado = () =>{
    //     const {id} = this.props.info;

    //     this.props.eliminarEmpleado(id);
    // }
    
    render() {
        // console.log("props.info", this.props.info);
        const {id, Date} = this.props.info;

        if (Date !== null) {

            var DateFormated = Date.split("T");
            var HourFormated = DateFormated[1].split(".");
            Date = DateFormated[0] + " " + HourFormated[0];
        }



        // console.log(DateFormated);

        const Users = this.props.info.Users.Dni;
        const State = this.props.info.State.Description;
        const Clients = this.props.info.Clients.Name + " " + this.props.info.Clients.LastName;
        const Adress = this.props.info.Adress.Adress + " " + this.props.info.Adress.Floor + " " + this.props.info.Adress.Department;
        const Amount = this.props.info.Amount.toFixed(0);

        let Delivery = this.props.info.Delivery.Name + this.props.info.Delivery.LastName;
        
        if(Delivery == null){
            Delivery = "Sin Asignar"
        }else{
            Delivery = this.props.info.Delivery.Name + " " +this.props.info.Delivery.LastName;
        }
        
        // cost Adress =  this.props.info.Adress.Adress + " " + this.props.info.Adress.Floor + " " + this.props.info.Adress.Department;
        console.log(this.props.info)

        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle}>{Date}</td>
                <td style={tableStyle}>{State}</td>
                <td style={tableStyle}>{Users}</td>
                <td style={tableStyle}>{Clients.substr(0,8)}</td>
                <td style={tableStyle}>{Adress}</td>
                <td style={tableStyle}>$ {Amount}</td>
                <td style={tableStyle}>{Delivery}</td>
                <td style={columnButtonStyle}>
                    <Link style={buttonStyle} to={{
                        pathname : `/pedidos/${id}`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link style={buttonStyle} to={{
                        pathname : `/pedidos/editar-pedido/${id}`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    <button style={buttonStyle} onClick={ this.eliminarEmpleado } type="button" className="btn btn-danger">Borrar</button>
                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarEmpleado}) (Pedido);