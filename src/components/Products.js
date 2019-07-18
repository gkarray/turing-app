import React, { Component } from "react";
import Pages from "./Pages";
import axios from "axios";
import Product from "./Product";
import { connect } from "react-redux";
import CardDeck from "react-bootstrap/CardDeck";
import Row from "react-bootstrap/Row";
import {
  changeNbPagesAction,
  changeProductsAction,
  changeCountAction
} from "../actions/actions";

class Products extends Component {
  componentDidMount = e => {
    const NB_PER_PAGE = 20;
    axios
      .get("https://backendapi.turing.com/products?page=" + this.props.page) //this.state.page)
      .then(response => {
        this.props.changeCount(response.data.count);
        this.props.changeNbPages(Math.ceil(response.data.count / NB_PER_PAGE));
        this.props.changeProducts(response.data.rows);
      });
  };

  render() {
    const items = this.props.products.map((obj, ind) => {
      return <Product product={this.props.products[ind]} key={ind} />;
    });
    return (
      <div className="Products">
        <Pages />
        <Row>
          <CardDeck>{items.slice(0, 4)}</CardDeck>
        </Row>
        <Row>
          <CardDeck>{items.slice(4, 8)}</CardDeck>
        </Row>
        <Row>
          <CardDeck>{items.slice(8, 12)}</CardDeck>
        </Row>
        <Row>
          <CardDeck>{items.slice(12, 16)}</CardDeck>
        </Row>
        <Row>
          <CardDeck>{items.slice(16, 19)}</CardDeck>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    query: state.query,
    page: state.page,
    selectedDepartment: state.selectedDepartment,
    selectedCategory: state.selectedCategory,
    searchWord: state.searchWord
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCount: newCount => {
      dispatch(changeCountAction(newCount));
    },
    changeNbPages: newNbPages => {
      dispatch(changeNbPagesAction(newNbPages));
    },
    changeProducts: newProducts => {
      dispatch(changeProductsAction(newProducts));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
