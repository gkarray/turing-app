import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactTimeout from "react-timeout";

class Cart extends Component {
  state = {
    cart: [],
    changed: true
  };

  componentDidMount() {
    axios
      .get("https://backendapi.turing.com/shoppingcart/" + this.props.cartID)
      .then(response => {
        this.setState({
          cart: response.data
        });
      })
      .catch(er => console.log("there's an error"));
  }

  handleDelete = e => {
    axios.delete(
      "https://backendapi.turing.com/shoppingcart/removeProduct/" + e.target.id
    );

    this.props.setTimout(() => {
      console.log("pfff");
    }, 5000);
  };

  handlePayment = e => {};
  render() {
    const items = this.state.cart.map((obj, ind) => {
      const lol = this.state.changed;
      console.log("pfff");
      return (
        <tr key={ind}>
          <td>{obj.name}</td>
          <td>{obj.attributes.substring(0, obj.attributes.indexOf(","))}</td>
          <td>
            {obj.attributes.substring(
              obj.attributes.indexOf(",") + 2,
              obj.attributes.length
            )}
          </td>
          <td>{obj.price}</td>
          <td>
            <Button onClick={this.handleDelete} id={obj.item_id}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    let totalPrice = 0;
    for (let number = 0; number < this.state.cart.length; number++) {
      totalPrice =
        parseFloat(totalPrice) + parseFloat(this.state.cart[number].price);
    }

    return (
      <Container>
        <h1 className="display-2" style={{ textAlign: "center" }}>
          Cart
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Color</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </Table>
        <h1 className="display-3" style={{ textAlign: "center" }}>
          Total : {totalPrice.toFixed(2)}
        </h1>

        <Button className="justify-content-center" onClick={this.handlePayment}>
          Proceed to payment
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartID: state.cartID
  };
};

export default ReactTimeout(connect(mapStateToProps)(Cart));
