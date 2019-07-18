import React, { Component } from "react";
import Colors from "./Colors";
import Sizes from "./Sizes";
import axios from "axios";
import ImageHolder from "./ImageHolder";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import {
  changeProductAction,
  changeSelectedSizeAction,
  changeSelectedColorAction
} from "../actions/actions";

class Details extends Component {
  state = {
    attributes: []
  };

  handleCart = e => {
    axios
      .post(
        "https://backendapi.turing.com/shoppingcart/add",
        {
          cart_id: this.props.cartID,
          product_id: this.props.product.product_id,
          attributes: this.props.selectedSize + ", " + this.props.selectedColor
        },
        {
          headers: {
            ContentType: "application/x-www-form-urlencoded",
            accept: "application/json"
          }
        }
      )
      .then(response => {
        this.props.changeProduct({});
        this.props.history.push("/");
      });
  };

  componentDidMount = e => {
    const id = this.props.match.params.detail_id;
    axios.get("https://backendapi.turing.com/products/" + id).then(response => {
      this.props.changeProduct(response.data);
    });

    this.props.changeSelectedColor("");
    this.props.changeSelectedSize("");
    axios
      .get("https://backendapi.turing.com/attributes/inProduct/" + id)
      .then(response => {
        this.setState({ attributes: response.data });
      });
  };

  render() {
    const price =
      this.props.product === null
        ? 0
        : (
            this.props.product.price - this.props.product.discounted_price
          ).toFixed(2);

    let newlyPrice;
    const tmp =
      this.props.product === null
        ? 0
        : parseFloat(this.props.product.price).toFixed(2);
    if (price !== tmp) {
      newlyPrice = (
        <div>
          <del className="mb-2 text-muted">
            {parseFloat(this.props.product.price).toFixed(2) + " TND"}
          </del>
          <br />
          <p className="mb-2 text-danger"> {price + " TND"}</p>
        </div>
      );
    } else {
      newlyPrice = <p className="mb-2 text-muted"> {price + " TND"}</p>;
    }

    return (
      <Row>
        <Col />
        <Col>
          <ImageHolder product={this.props.product} />
          <div style={{ textAlign: "center" }}>
            <h5>Name</h5> {this.props.product.name}
            <br />
            <h5>Description</h5>
            {this.props.product.description}
            <br />
            <h5>Price</h5> {newlyPrice}
            <br />
            <br />
            <br />
            <Sizes attributes={this.state.attributes} />
            <br />
            <br />
            <Colors attributes={this.state.attributes} />
            <br />
            <br />
            <Button onClick={this.handleCart}>Add to cart</Button>
          </div>
        </Col>
        <Col />
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.selectedProduct,
    selectedSize: state.selectedSize,
    selectedColor: state.selectedColor,
    cartID: state.cartID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeProduct: newProduct => {
      dispatch(changeProductAction(newProduct));
    },
    changeSelectedColor: newSelectedColor => {
      dispatch(changeSelectedColorAction(newSelectedColor));
    },
    changeSelectedSize: newSelectedSize => {
      dispatch(changeSelectedSizeAction(newSelectedSize));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
