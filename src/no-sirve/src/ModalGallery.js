import React from "react";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homes from "./Home.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SidebarExample from "./SidebarExample.js";
// import Home from './pages/index/buttonsIndex.js';

class ModalSwitch extends React.Component {

  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    let { location } = this.props;

    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    console.log(this.props.location);
    console.log(this.previousLocation);
    let { location } = this.props;

    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/paper" component={Homes} />
          <Route path="/sidebar" component={SidebarExample} />
        </Switch>
      </div>
    );
  }
}


function Home(props) {
  const { classes } = props;
  return (
    <div>
      <Button color="primary">
        <Link to="/paper">Visit paper</Link>
      </Button>
      <h2>Featured Images</h2>
      <ul>
        <li>
          <Link to="/img/2">Tomato</Link>
        </li>
        <li>
          <Link to="/img/4">Crimson</Link>
        </li>
      </ul>
    </div>
  );
}


function ModalGallery() {
  return (
    <Router>
      <Route component={ModalSwitch} />
    </Router>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ModalGallery;
