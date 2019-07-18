import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

class Product extends Component {
  render() {
    const price = (
      this.props.product.price - this.props.product.discounted_price
    ).toFixed(2);

    const srcThumbnail = "../images/" + this.props.product.thumbnail;

    if (price !== parseFloat(this.props.product.price).toFixed(2)) {
      return (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={srcThumbnail} />
          <Card.Body variant="bottom">
            <Card.Title>{this.props.product.name}</Card.Title>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">
                <del>
                  {parseFloat(this.props.product.price).toFixed(2) + " TND"}
                </del>
              </Card.Subtitle>
            </Col>
            <Col>
              <Card.Subtitle className="mb-2 text-danger">
                {price + " TND"}
              </Card.Subtitle>
            </Col>
            <Card.Text>{this.props.product.description}</Card.Text>{" "}
            <Link to={"details/" + this.props.product.product_id}>
              <Button variant="primary">Details</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={srcThumbnail} />
          <Card.Body variant="bottom">
            <Card.Title>{this.props.product.name}</Card.Title>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">
                {price + " TND"}
              </Card.Subtitle>
            </Col>
            <Card.Text>{this.props.product.description}</Card.Text>{" "}
            <Link to={"details/" + this.props.product.product_id}>
              <Button variant="primary">Details</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default Product;
