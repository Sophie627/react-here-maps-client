import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from './Login.js';
import Button from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/Index/IndexButtons.css';
import HomePedidos from '../pedidos/home-pedidos.js';
import { connect } from 'react-redux';
import * as actions from '../../actions';


const styles = theme => ({
  root: {
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 450,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 450,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    fontSize: '2rem',
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: 'https://picsum.photos/450/440/?random',
    title: 'Pedidos',
    width: '33.3%',
    link: '/pedidos',
  },
  {
    url: 'https://picsum.photos/440/450/?random',
    title: 'Modulos',
    width: '33.3%',
    link: '/modulo',
  },
  {
    url: 'https://picsum.photos/450/450/?random',
    title: 'Combos',
    width: '33.3%',
    link: '/combo',
  },
  {
    url: 'https://picsum.photos/440/440/?random',
    title: 'RRHH',
    width: '33.3%',
    link: '/rrhh',
  },
  {
    url: 'https://picsum.photos/445/445/?random',
    title: 'Reportes',
    width: '33.3%',
    link: '/reportes',
  },
  {
    url: 'https://picsum.photos/460/450/?random',
    title: 'Gastos',
    width: '33.3%',
    link: '/gastos',
  }
];
class Principal extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
 pageContent(){
   console.log("EStoy aca"+JSON.stringify(this.props))
    switch (this.props.auth.logged) {
      case null:
      return;
      case true:
      return this.LoggedContent(this.props)
      case false:
      return this.NotLoggedContent()
    }
}

  NotLoggedContent(){
   return(
    <LoginForm/>
   )
 }

 LoggedContent(props){
  const { classes } = props;
  return(
    <div className={classes.root}>

            {images.map(image => (
              
                <Link to={image.link} className={classes.root}>
                <Button
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: image.width,
                }}
                >
                
                <span
                    className={classes.imageSrc}
                    style={{
                    backgroundImage: `url(${image.url})`,
                    }}
                />

                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                    >
                    {image.title}
                    <span className={classes.imageMarked} />
                    </Typography>
                </span>
                </Button>
                </Link>
            ))}
            
            </div> 
  )
}

 render() {


  return (
      <div>
        <div className="App-header">
          DASHBOARD
        </div>
        

         <div className="App-body">

        
        {this.pageContent()}
           
        </div> 
    </div>
  );
}
}

Principal.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
      auth: state.auth
  };
}; 

export default withStyles(styles)(connect(mapStateToProps,actions)(Principal));