import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { connect } from "react-redux";
import { changeSelectedColorAction } from "../actions/cartActions";

class Colors extends Component {
  handleClick = e => {
    this.props.changeSelectedColor(e.target.id);
  };

  render() {
    const sizes = this.props.attributes
      .filter(obj => obj.attribute_name === "Color")
      .map(obj => {
        return (
          <Button
            variant="secondary"
            onClick={this.handleClick}
            key={obj.attribute_value}
            id={obj.attribute_value}
            active={this.props.selectedColor === obj.attribute_value}
          >
            {obj.attribute_value}
          </Button>
        );
      });

    return <ButtonGroup>{sizes}</ButtonGroup>;
  }
}

const mapStateToProps = state => {
  return { selectedColor: state.selectedColor };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedColor: newSelectedColor => {
      dispatch(changeSelectedColorAction(newSelectedColor));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Colors);
