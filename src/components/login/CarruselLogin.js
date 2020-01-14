import React, { Component } from 'react';
import {Carousel, Image} from 'react-bootstrap';
import StylesCarruselLogin from '../../assets/css/Login/StylesCarruselLogin'
import PropTypes from 'prop-types';

class CarruselLogin extends Component {
  state = {  }
  render() { 

    const { classes } = this.props;

    return (
      <React.Fragment>
    <div style={StylesCarruselLogin}>
    <Carousel>
      <Carousel.Item>
        <Image src="https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg" rounded />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image src="https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg" rounded />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image src="https://placeralplato.com/files/2016/01/Pizza-con-pepperoni.jpg" rounded />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  </React.Fragment>
    );
  }
}

export default CarruselLogin;