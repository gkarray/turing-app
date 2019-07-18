import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import Default from "./Default";
import Register from "./Register";
import Login from "./Login";
import Details from "./Details";
import Profile from "./Profile";
import Cart from "./Cart";
import axios from "axios";
import { connect } from "react-redux";
import { changeCartIDAction } from "../actions/cartActions";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    axios
      .get("https://backendapi.turing.com/shoppingcart/generateUniqueId")
      .then(response => {
        this.props.changeCartID(response.data.cart_id);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Default} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/details/:detail_id" component={Details} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changeCartID: newCartID => {
      dispatch(changeCartIDAction(newCartID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
