import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { connect } from "react-redux";
import { changeSelectedSizeAction } from "../actions/actions";

class Sizes extends Component {
  handleClick = e => {
    this.props.changeSelectedSize(e.target.id);
    console.log(e.target.id);
  };

  render() {
    const sizes = this.props.attributes
      .filter(obj => obj.attribute_name === "Size")
      .map(obj => {
        return (
          <Button
            onClick={this.handleClick}
            key={obj.attribute_value}
            id={obj.attribute_value}
            active={this.props.selectedSize === obj.attribute_value}
          >
            {obj.attribute_value}
          </Button>
        );
      });

    return <ButtonGroup aria-label="Basic example">{sizes}</ButtonGroup>;
  }
}

const mapStateToProps = state => {
  return { selectedSize: state.selectedSize };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedSize: newSelectedSize => {
      dispatch(changeSelectedSizeAction(newSelectedSize));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sizes);
