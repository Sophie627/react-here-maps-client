import React from 'react';
import Grid from '@material-ui/core/Grid';
import CarruselLogin from './CarruselLogin';
import SignInForm from './SignInForm';
//this.props.history.push('/SignUpOk');   
const carouselLogin = {
  margin: '40px',
  border: '5px solid pink'
};

class LoginForm extends React.Component {
  

  render() {
    return (
      <Grid container >
<Grid container item xs={12} md={1} lg={1}> </Grid>
        <Grid container item xs={12} md={6} lg={6}>


              <SignInForm/>
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
              <CarruselLogin />
              </Grid>


       
        </Grid>
    )
  }
}
export default LoginForm;