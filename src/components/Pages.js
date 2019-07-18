import React, { Component } from "react";
import Pagination from "react-bootstrap/Pagination";
import { connect } from "react-redux";
import { changeProductsAction, changePageAction } from "../actions/actions";
import axios from "axios";

class Pages extends Component {
  handleClick = e => {
    const newPage = e.target.id;

    switch (this.props.query) {
      case "department":
        axios
          .get(
            "https://backendapi.turing.com/products/inDepartment/" +
              //this.state.selectedDepartment +
              this.props.selectedDepartment +
              "?page=" +
              //this.state.page
              newPage
          )
          .then(response => {
            const data = response.data.rows;
            this.props.changePage(newPage);
            this.props.changeProducts(data);
          });
        break;
      case "category":
        axios
          .get(
            "https://backendapi.turing.com/products/inCategory/" +
              //this.state.selectedCategory +
              this.props.selectedCategory +
              "?page=" +
              //this.state.page
              newPage
          )
          .then(response => {
            const data = response.data.rows;
            this.props.changePage(newPage);
            this.props.changeProducts(data);
          });
        break;
      case "search":
        axios
          .get(
            "https://backendapi.turing.com/products/search?query_string=" +
              //this.state.searchWord +
              this.props.searchWord +
              "&page=" +
              //this.state.page
              newPage
          )
          .then(response => {
            const data = response.data.rows;
            this.props.changePage(newPage);
            this.props.changeProducts(data);
          });
        break;
      default:
        axios
          .get("https://backendapi.turing.com/products?page=" + newPage) //this.state.page)
          .then(response => {
            const data = response.data.rows;
            this.props.changePage(newPage);
            this.props.changeProducts(data);
          });
    }
  };
  render() {
    const nbPages = this.props.nbPages;
    const page = this.props.page;
    const plus1 = page + 1;
    const plus2 = page + 2;
    const minus1 = page - 1;
    const minus2 = page - 2;

    if (nbPages <= 3) {
      let items = [];
      for (let number = 1; number <= nbPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === page}
            onClick={this.handleClick}
            id={number}
          >
            {number}
          </Pagination.Item>
        );
      }
      return (
        <Pagination className="justify-content-center">{items}</Pagination>
      );
    } else {
      switch (page) {
        case 1:
          return (
            <Pagination className="justify-content-center">
              <Pagination.Item active id={page}>
                {page}
              </Pagination.Item>
              <Pagination.Item id={plus1} onClick={this.handleClick}>
                {plus1}
              </Pagination.Item>
              <Pagination.Item id={plus2} onClick={this.handleClick}>
                {plus2}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item id={nbPages} onClick={this.handleClick}>
                {nbPages}
              </Pagination.Item>
              <Pagination.Next id={plus1} onClick={this.handleClick} />
            </Pagination>
          );
        case 2:
          return (
            <Pagination className="justify-content-center">
              <Pagination.Item id={minus1} onClick={this.handleClick}>
                {minus1}
              </Pagination.Item>
              <Pagination.Item active id={page}>
                {page}
              </Pagination.Item>

              <Pagination.Item id={plus1} onClick={this.handleClick}>
                {plus1}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item id={nbPages} onClick={this.handleClick}>
                {nbPages}
              </Pagination.Item>
              <Pagination.Next id={plus1} onClick={this.handleClick} />
            </Pagination>
          );

        case nbPages - 1:
          return (
            <Pagination className="justify-content-center">
              <Pagination.Prev id={minus1} onClick={this.handleClick} />
              <Pagination.Item id={1} onClick={this.handleClick}>
                {1}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />

              <Pagination.Item id={minus1} onClick={this.handleClick}>
                {minus1}
              </Pagination.Item>
              <Pagination.Item id={page} onClick={this.handleClick} active>
                {page}
              </Pagination.Item>
              <Pagination.Item id={plus1} onClick={this.handleClick}>
                {plus1}
              </Pagination.Item>
            </Pagination>
          );

        case nbPages:
          return (
            <Pagination className="justify-content-center">
              <Pagination.Prev id={minus1} onClick={this.handleClick} />
              <Pagination.Item id={1} onClick={this.handleClick}>
                {1}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item id={minus2} onClick={this.handleClick}>
                {minus2}
              </Pagination.Item>
              <Pagination.Item id={minus1} onClick={this.handleClick}>
                {minus1}
              </Pagination.Item>
              <Pagination.Item id={page} onClick={this.handleClick} active>
                {page}
              </Pagination.Item>
            </Pagination>
          );

        default:
          return (
            <Pagination className="justify-content-center">
              <Pagination.Prev id={minus1} onClick={this.handleClick} />
              <Pagination.Item id={1} onClick={this.handleClick}>
                {1}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item id={minus1} onClick={this.handleClick}>
                {minus1}
              </Pagination.Item>
              <Pagination.Item id={page} onClick={this.handleClick} active>
                {page}
              </Pagination.Item>
              <Pagination.Item id={plus1} onClick={this.handleClick}>
                {plus1}
              </Pagination.Item>
              <Pagination.Ellipsis disabled />
              <Pagination.Item onClick={this.handleClick} id={nbPages}>
                {nbPages}
              </Pagination.Item>
              <Pagination.Next id={plus1} onClick={this.handleClick} />
            </Pagination>
          );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    query: state.query,
    nbPages: state.nbPages,
    page: state.page,
    selectedDepartment: state.selectedDepartment,
    selectedCategory: state.selectedCategory,
    searchWord: state.searchWord
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: newPage => {
      dispatch(changePageAction(newPage));
    },
    changeProducts: newProducts => {
      dispatch(changeProductsAction(newProducts));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pages);
