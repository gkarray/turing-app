import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class Register extends Component {
  state = {
    email: "",
    name: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("https://backendapi.turing.com/customers", data, {
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          accept: "application/json"
        }
      })
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <Container>
        <h1 className="display-2" style={{ textAlign: "center" }}>
          Register
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
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              onChange={this.changeHandler}
              value={this.state.name.value}
              placeholder="Name"
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
  }
}

export default Register;
