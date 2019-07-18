import React from "react";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import Products from "./Products";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Default = () => {
  return (
    <div className="Default">
      <SearchBar />
      <Row>
        <Col xs={2}>
          <Categories />
        </Col>
        <Col>
          <Products />
        </Col>
      </Row>
    </div>
  );
};

export default Default;
