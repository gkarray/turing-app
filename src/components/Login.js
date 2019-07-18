import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { changeUserAction } from "../actions/actions";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("https://backendapi.turing.com/customers/login", data, {
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          accept: "application/json"
        }
      })
      .then(response => {
        this.props.changeUser(response.data);
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <Container>
        <h1 className="display-2" style={{ textAlign: "center" }}>
          Login
        </h1>

        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={this.changeHandler}
              value={this.state.email.value}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.changeHandler}
              value={this.state.password.value}
              placeholder="Password"
            />
          </Form.Group>
        </Form>

        <Button onClick={this.handleSubmit}>Submit</Button>
      </Container>
    );

    // return (
    //   <div>
    //     <form>
    //       <label htmlFor="email">Email :</label>
    //       <input
    //         type="email"
    //         value={this.state.email.value}
    //         onChange={this.changeHandler}
    //         id="email"
    //       />

    //       <label htmlFor="password">Password :</label>
    //       <input
    //         type="password"
    //         value={this.state.password.value}
    //         onChange={this.changeHandler}
    //         id="password"
    //       />
    //     </form>
    //     <button onClick={this.handleSubmit}>Submit</button>
    //   </div>
    // );
  }
}

const mapStateToProp = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProp = dispatch => {
  return {
    changeUser: newUser => dispatch(changeUserAction(newUser))
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(Login);
