import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { changeCustomerAction } from "../actions/actions";

class Profile extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    day_phone: "",
    eve_phone: "",
    mob_phone: "",
    address_1: "",
    address_2: "",
    city: "",
    region: "",
    postal_code: "",
    country: "",
    shipping_region_id: "",
    credit_card: ""
  };

  handleSubmit = e => {
    switch (e.target.id) {
      case "infos":
        console.log(this.state);
        axios
          .put(
            "https://backendapi.turing.com/customer",
            {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              day_phone: this.state.day_phone,
              eve_phone: this.state.eve_phone,
              mob_phone: this.state.mob_phone
            },
            {
              headers: {
                ContentType: "application/x-www-form-urlencoded",
                accept: "application/json",
                "user-key": this.props.user.accessToken
              }
            }
          )
          .then(response => {
            const res = response.data;
            console.log(res);
            this.props.changeCustomer(res);
            this.props.history.push("/profile");
          });
        break;
      case "address":
        console.log(this.state);
        axios
          .put(
            "https://backendapi.turing.com/customer/address",
            {
              address_1: this.state.address_1,
              address_2: this.state.address_2,
              city: this.state.city,
              region: this.state.region,
              postal_code: this.state.postal_code,
              country: this.state.country,
              shipping_region_id: parseInt(this.state.shipping_region_id)
            },
            {
              headers: {
                ContentType: "application/x-www-form-urlencoded",
                accept: "application/json",
                "user-key": this.props.user.accessToken,
                "Access-Control-Allow-Origin": "http://localhost:3000"
              }
            }
          )
          .then(response => {
            this.props.changeCustomer(response.data);
            this.props.history.push("/profile");
          })
          .catch(error => {
            console.log(this.props.user.accessToken);
            console.log(error.message);
          });
        break;
      case "credit":
        axios
          .put(
            "https://backendapi.turing.com/customer/creditCard",
            {
              credit_card: this.state.credit_card
            },
            {
              headers: {
                ContentType: "application/x-www-form-urlencoded",
                accept: "application/json",
                "user-key": this.props.user.accessToken
              }
            }
          )
          .then(response => {
            this.props.changeCustomer(response.data);
            this.props.history.push("/profile");
          });
        break;
      default:
        break;
    }
  };

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <Container>
        <h1 className="display-2" style={{ textAlign: "center" }}>
          Profile
        </h1>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Customer's infos
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Form.Group controlId="email">
                    <Form.Label>
                      Email address (Actual : "{this.props.user.customer.email}
                      ")
                    </Form.Label>
                    <Form.Control
                      type="email"
                      onChange={this.changeHandler}
                      value={this.state.email.value}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group controlId="name">
                    <Form.Label>
                      Name (Actual : "{this.props.user.customer.name}")
                    </Form.Label>
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
                  <Form.Row>
                    <Form.Group as={Col} controlId="day_phone">
                      <Form.Label>
                        Day Phone (Actual : "
                        {this.props.user.customer.day_phone}")
                      </Form.Label>
                      <Form.Control
                        type="day_phone"
                        onChange={this.changeHandler}
                        value={this.state.day_phone.value}
                        placeholder="Day Phone"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="eve_phone">
                      <Form.Label>
                        Eve Phone (Actual : "
                        {this.props.user.customer.eve_phone}")
                      </Form.Label>
                      <Form.Control
                        type="eve_phone"
                        onChange={this.changeHandler}
                        value={this.state.eve_phone.value}
                        placeholder="Eve Phone"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="mob_phone">
                      <Form.Label>
                        Mobile Phone (Actual : "
                        {this.props.user.customer.mob_phone}")
                      </Form.Label>
                      <Form.Control
                        type="mob_phone"
                        onChange={this.changeHandler}
                        value={this.state.mob_phone.value}
                        placeholder="Mobile Phone"
                      />
                    </Form.Group>
                  </Form.Row>
                </Form>
                <Button id="infos" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Customer's address
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Form>
                  <Form.Group controlId="address_1">
                    <Form.Label>
                      Address 1 (Actual : "{this.props.user.customer.address_1}
                      ")
                    </Form.Label>
                    <Form.Control
                      type="address_1"
                      onChange={this.changeHandler}
                      value={this.state.address_1.value}
                      placeholder="Address 1"
                    />
                  </Form.Group>
                  <Form.Group controlId="address_2">
                    <Form.Label>
                      Address 2 (Actual : "{this.props.user.customer.address_2}
                      ")
                    </Form.Label>
                    <Form.Control
                      type="address_2"
                      onChange={this.changeHandler}
                      value={this.state.address_2.value}
                      placeholder="Address 2"
                    />
                  </Form.Group>
                  <Form.Row>
                    <Form.Group as={Col} controlId="city">
                      <Form.Label>
                        City (Actual : "{this.props.user.customer.city}")
                      </Form.Label>
                      <Form.Control
                        type="city"
                        onChange={this.changeHandler}
                        value={this.state.city.value}
                        placeholder="City"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="region">
                      <Form.Label>
                        Region (Actual : "{this.props.user.customer.region}")
                      </Form.Label>
                      <Form.Control
                        type="region"
                        onChange={this.changeHandler}
                        value={this.state.region.value}
                        placeholder="Region"
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="postal_code">
                      <Form.Label>
                        Postal code (Actual : "
                        {this.props.user.customer.postal_code}")
                      </Form.Label>
                      <Form.Control
                        type="postal_code"
                        onChange={this.changeHandler}
                        value={this.state.postal_code.value}
                        placeholder="Postal code"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="country">
                      <Form.Label>
                        Country (Actual : "{this.props.user.customer.country}")
                      </Form.Label>
                      <Form.Control
                        type="country"
                        onChange={this.changeHandler}
                        value={this.state.country.value}
                        placeholder="Country"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="shipping_region_id">
                      <Form.Label>
                        Shipping region ID (Actual : "
                        {this.props.user.customer.shipping_region_id}")
                      </Form.Label>
                      <Form.Control
                        type="shipping_region_id"
                        onChange={this.changeHandler}
                        value={this.state.shipping_region_id.value}
                        placeholder="Shipping region ID"
                      />
                    </Form.Group>
                  </Form.Row>
                </Form>
                <Button onClick={this.handleSubmit} id="address">
                  Submit
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Customer's credit card
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Form>
                  <Form.Group controlId="credit_card">
                    <Form.Label>
                      Credit card (Actual : "
                      {this.props.user.customer.credit_card}")
                    </Form.Label>
                    <Form.Control
                      type="credit_card"
                      onChange={this.changeHandler}
                      value={this.state.credit_card.value}
                      placeholder="Credit card"
                    />
                  </Form.Group>
                </Form>
                <Button id="credit" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCustomer: newCustomer => {
      dispatch(changeCustomerAction(newCustomer));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
