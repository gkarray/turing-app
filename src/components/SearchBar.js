import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import {
  changeSelectedDepartmentAction,
  changeCategoriesAction,
  changeProductsAction,
  changeCountAction,
  changeNbPagesAction,
  changeQueryAction,
  changeSelectedCategoryAction,
  changePageAction
} from "../actions/productsActions";
import axios from "axios";
import { connect } from "react-redux";

class SearchBar extends Component {
  state = {
    departments: []
  };

  componentDidMount = e => {
    axios.get("https://backendapi.turing.com/departments").then(response => {
      const data = response.data;
      this.setState({
        departments: data
      });
    });
  };

  handleSelect = selectedKey => {
    if (selectedKey !== this.props.selectedDepartment) {
      const NB_PER_PAGE = 20;
      axios
        .get(
          "https://backendapi.turing.com/products/inDepartment/" + selectedKey
        )
        .then(response => {
          const data = response.data.rows;
          this.props.changeProducts(data);
          this.props.changeCount(response.data.count);
          this.props.changeNbPages(
            Math.ceil(response.data.count / NB_PER_PAGE)
          );
          this.props.changeQuery("department");
          this.props.changeSelectedDepartment(selectedKey);
          this.props.changeSelectedCategory(0);
          this.props.changePage(1);
        });
      axios
        .get(
          "https:backendapi.turing.com/categories/inDepartment/" + selectedKey
        )
        .then(response => {
          const data = response.data;
          this.props.changeCategories(data);
        });
    } else {
      this.handleSelectAll("all");
    }
  };

  handleSelectAll = selectedKey => {
    const NB_PER_PAGE = 20;
    axios
      .get("https://backendapi.turing.com/products?page=1") //this.state.page)
      .then(response => {
        this.props.changeCount(response.data.count);
        this.props.changeNbPages(Math.ceil(response.data.count / NB_PER_PAGE));
        this.props.changeProducts(response.data.rows);
        this.props.changeSelectedCategory(0);
        this.props.changeSelectedDepartment(0);
        this.props.changePage(1);
        this.props.changeQuery("none");
      });

    axios.get("https://backendapi.turing.com/categories").then(response => {
      const data = response.data.rows;
      this.props.changeCategories(data);
    });
  };

  render() {
    const deps = this.state.departments.map(department => {
      return (
        <Nav.Link
          eventKey={department.department_id}
          onSelect={this.handleSelect}
          className={
            this.props.selectedDepartment === department.department_id
              ? "text-danger"
              : "normal"
          }
          key={department.department_id}
        >
          {department.name}
        </Nav.Link>
      );
    });

    return (
      <Navbar>
        <Col />
        <Nav
          className="justify-content-center"
          as={Col}
          activeKey={this.props.selectedDepartment}
        >
          <Nav.Link
            eventKey="all"
            className={
              this.props.selectedDepartment === 0 ? "text-danger" : "normal"
            }
            onSelect={this.handleSelectAll}
          >
            All
          </Nav.Link>
          {deps}
        </Nav>
        <Nav.Item as={Col} style={{ textAlign: "right" }}>
          <input
            type="text"
            id="search"
            placeholder="Search"
            className="justify-content-end"
            onChange={this.handleChange}
          />
        </Nav.Item>
      </Navbar>
    );
  }

  handleChange = e => {
    if (e.target.value !== "") {
      const NB_PER_PAGE = 20;
      axios
        .get(
          "https://backendapi.turing.com/products/search?query_string=" +
            e.target.value
        )
        .then(response => {
          const data = response.data.rows;
          this.props.changeProducts(data);
          this.props.changeCount(response.data.count);
          this.props.changeNbPages(
            Math.ceil(response.data.count / NB_PER_PAGE)
          );
          this.props.changeQuery("search");
          this.props.changeSelectedDepartment(0);
          this.props.changeSelectedCategory(0);
          this.props.changePage(1);
        });

      axios.get("https://backendapi.turing.com/categories").then(response => {
        const data = response.data.rows;
        this.props.changeCategories(data);
      });
    } else {
      this.handleSelectAll("all");
    }
  };
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    selectedDepartment: state.selectedDepartment,
    page: state.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedDepartment: newSelectedDepartment => {
      dispatch(changeSelectedDepartmentAction(newSelectedDepartment));
    },
    changeCategories: newCategories => {
      dispatch(changeCategoriesAction(newCategories));
    },
    changeProducts: newProducts => {
      dispatch(changeProductsAction(newProducts));
    },
    changeCount: newCount => {
      dispatch(changeCountAction(newCount));
    },
    changeNbPages: newNbPages => {
      dispatch(changeNbPagesAction(newNbPages));
    },
    changeQuery: newQuery => {
      dispatch(changeQueryAction(newQuery));
    },
    changeSelectedCategory: newSelectedCategory => {
      dispatch(changeSelectedCategoryAction(newSelectedCategory));
    },
    changePage: newPage => {
      dispatch(changePageAction(newPage));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
