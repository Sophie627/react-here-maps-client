import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarCombo } from '../../actions/combosAction';

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

class Combo extends Component {

    eliminarCombo = () =>{
        const {id} = this.props.info;
        
        this.props.eliminarCombo(id);
    }
    
    render() {
        const { Description, Name, Amount, id } = this.props.info

        // console.log(this.props.info);

        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle} >{Name}</td>
                <td style={tableStyle} >{Description}</td>
                <td style={tableStyle} >$ {Amount}</td>
                <td style={columnButtonStyle}>
                    <Link style={buttonStyle} to={{
                        pathname : `/combos/${id}`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    <Link style={buttonStyle} to={{
                        pathname : `/combos/editar-combo/${id}`,
                        state : this.props.info
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    <button style={buttonStyle} onClick={ this.eliminarCombo } type="button" className="btn btn-danger">Borrar</button>
                </td> 
            </tr>
            </React.Fragment>
        );
    }
}

export default connect(null, {eliminarCombo}) (Combo);