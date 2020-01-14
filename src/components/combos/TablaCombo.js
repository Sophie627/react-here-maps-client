import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListaCombos from './ListaCombos';
import Header from '../header/IndexHeader';
import StickyButton from '../bottom/StickyButton';

class Combo extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Header 
                    titulo = 'Lista de Combos'
                />
                <div className="col-12 col-md-12">
                    <ListaCombos/>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Link to={`/combos/alta-combo`} className="btn btn-success">Nuevo Combo</Link> 
                    </div>
                </div>
                <StickyButton/>
            </div>
        );
    }
}

export default Combo;