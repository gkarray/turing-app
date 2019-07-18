import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
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

class Categories extends Component {
  componentDidMount = e => {
    axios.get("https://backendapi.turing.com/categories").then(response => {
      const data = response.data.rows;
      this.props.changeCategories(data);
    });
  };

  handleSelect = selectedKey => {
    const NB_PER_PAGE = 20;
    if (this.props.selectedCategory !== selectedKey) {
      // axios
      //   .get("https://backendapi.turing.com/categories/" + selectedKey)
      //   .then(response => {
      //     this.props.changeSelectedDepartment(response.data.department_id);
      //   });

      axios
        .get("https://backendapi.turing.com/products/inCategory/" + selectedKey)
        .then(response => {
          const data = response.data.rows;
          this.props.changeProducts(data);
          this.props.changeCount(response.data.count);
          this.props.changeNbPages(
            Math.ceil(response.data.count / NB_PER_PAGE)
          );
          this.props.changeQuery("category");
          this.props.changeSelectedCategory(selectedKey);
          this.props.changePage(1);
        });
    } else {
      if (this.props.selectedDepartment !== 0) {
        axios
          .get(
            "https://backendapi.turing.com/products/inDepartment/" +
              this.props.selectedDepartment
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
        axios
          .get("https://backendapi.turing.com/products?page=1") //this.state.page)
          .then(response => {
            this.props.changeCount(response.data.count);
            this.props.changeNbPages(
              Math.ceil(response.data.count / NB_PER_PAGE)
            );
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
      }
    }
  };

  render() {
    const cats = this.props.categories.map(category => {
      return (
        <Nav.Link
          eventKey={category.category_id}
          onSelect={this.handleSelect}
          className={
            this.props.selectedCategory === category.category_id
              ? "text-danger"
              : "normal"
          }
          key={category.category_id}
        >
          {category.name}
        </Nav.Link>
      );
    });
    return (
      <div className="Categories">
        <h2>Categories</h2>
        <Nav className="flex-column" activeKey={this.props.selectedCategory}>
          {cats}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    selectedCategory: state.selectedCategory,
    selectedDepartment: state.selectedDepartment
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
)(Categories);
