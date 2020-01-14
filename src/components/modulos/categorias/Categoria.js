import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { eliminarCategoria } from '../../../actions/categoriasAction'

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

class Categoria extends Component {

    eliminarCategoria = () =>{
        const {id} = this.props.info;

        this.props.eliminarCategoria(id);
    }

    mostrarContenido = () => {
        const { id, Name, Description } = this.props.info

        // console.log(this.props.info)

        if(this.props.info.id){
            return(
            <React.Fragment>
            <Link style={buttonStyle} to={{
                pathname : `/producto/${id}`,
                state : this.props.info,
                nameCat : this.props.info.Name
                }} className="btn btn-primary">
                Ver
            </Link>
                
            <Link style={buttonStyle} to={{
                pathname : `/modulo/editar-categoria/${id}`,
                state : this.props.info
                }} className="btn btn-warning">
                Editar
            </Link>

            <button style={buttonStyle} onClick={ this.eliminarCategoria } type="button" className="btn btn-danger">Borrar</button>
            </React.Fragment>
            );
        }else{
            return(
                <React.Fragment>
                <button style={buttonStyle} disabled type="button" className="btn btn-primary">Ver</button>
                    
                <button style={buttonStyle} disabled type="button" className="btn btn-warning">Editar</button>
    
                <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
                </React.Fragment>
                );
        }

    }
    
    render() {
        const { id, Name, Description } = this.props.info
        // console.log(this.props.info)
        
        return (
            <React.Fragment>
            <tr>
                <td style={tableStyle}>{Name}</td>
                <td style={tableStyle}>{Description}</td>
                <td style={columnButtonStyle}>
                    {this.mostrarContenido()}
                </td> 
            </tr>
            
            </React.Fragment>
        );
    }
}

export default connect(null, { eliminarCategoria }) (Categoria);