import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";
import Image from "react-bootstrap/Image";

class ImageHolder extends Component {
  state = {
    image1: true
  };

  handleClick = e => {
    this.setState({ image1: !this.state.image1 });
  };

  render() {
    if (this.state.image1) {
      const srcImage = "../images/" + this.props.product.image;
      return (
        <div className="justify-content-center">
          <Pagination className="justify-content-center">
            <Image src={srcImage} />
            <Pagination.Next
              onClick={this.handleClick}
              style={{ marginTop: "60px" }}
              id="nextImageHolder"
            />
          </Pagination>
        </div>
      );
    } else {
      const srcImage = "../images/" + this.props.product.image_2;
      return (
        <div className="justify-content-center">
          <Pagination className="justify-content-center">
            <Pagination.Prev
              onClick={this.handleClick}
              id="prevImageHolder"
              style={{ marginTop: "60px" }}
            />
            <Image src={srcImage} />
          </Pagination>
        </div>
      );
    }
  }
}

export default ImageHolder;
