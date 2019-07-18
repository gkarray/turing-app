import React, { Component } from "react";
import logo from "../logo.svg";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { changeUserAction } from "../actions/userActions";

class NavigationBar extends Component {
  handleLogOut = e => {
    this.props.changeUser(null);
  };

  render() {
    const loggedIn = !(this.props.user === null);
    if (loggedIn) {
      return (
        <div className="loggedInDiv">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
              <Link to="/">
                <img src={logo} height="40" alt="logo" />
              </Link>
            </Navbar.Brand>
            <Nav>
              <Link to="/profile">
                <Nav.Item className="nav-link">Profile</Nav.Item>
              </Link>
            </Nav>
            <Nav as={Col} className="justify-content-end">
              <Link to="#">
                <Nav.Item className="nav-link" onClick={this.handleLogOut}>
                  Log Out
                </Nav.Item>
              </Link>
              <Link to="/cart">
                <Nav.Item className="nav-link">Cart</Nav.Item>
              </Link>
            </Nav>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div className="NotLoggedInDiv">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
              <Link to="/">
                <img src={logo} height="40" alt="logo" />
              </Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <NavLink to="/register">
                <Nav.Item className="nav-link">Register</Nav.Item>
              </NavLink>
              <NavLink to="/login">
                <Nav.Item className="nav-link">Login</Nav.Item>
              </NavLink>
            </Nav>
            <Nav as={Col} className="justify-content-end">
              <Link to="/cart">
                <Nav.Item className="nav-link">Cart</Nav.Item>
              </Link>
            </Nav>
          </Navbar>
        </div>
      );
    }
  }
}

const mapStateToProp = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProp = dispatch => {
  return {
    changeUser: newUser => {
      dispatch(changeUserAction(newUser));
    }
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(NavigationBar);
