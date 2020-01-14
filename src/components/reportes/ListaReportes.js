import React, {Component} from 'react';

import DoughnutExample from './doughnut';
import DynamicDoughnutExample from './dynamic-doughnut';
import PieExample from './pie';
import LineExample from './line';
import BarExample from './bar';
import HorizontalBarExample from './horizontalBar';
import Header from '../header/IndexHeader';

class ListaReportes extends Component {
    state = {  }
        render() {
            return (
                <div>
                    <Header 
                        titulo = 'Reportes'
                    />
                    <h2 style={{textAlign: 'center'}}>Gastos por Producto</h2>
                    <DoughnutExample />
                    <hr />
                    {/* <DynamicDoughnutExample /> */}
                    {/* <hr /> */}
                    <PieExample />
                    <hr />
                    <LineExample />
                    <hr />
                    <BarExample />
                    <hr />
                    <HorizontalBarExample />
                    <hr />
                </div>
            );
        }
}
 
export default ListaReportes;