import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  Nav,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FaUser, FaSearch } from "react-icons/fa";
import logo from "../assets/images/VLLogo.png";
import CartWidget from "./CartWidget";
import "./NavBar.css";
import { ItemCategory } from "./Constants";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar navbar-bg-light fixed-top">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} className="navbar-logo" alt="Logo" />
      </Navbar.Brand>
      <Form className="form-inline search-form">
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            as={Link}
            to={`/category/${ItemCategory.VIDEO}`}
            className="fixed-width-button"
            variant="outline-secondary"
          >
            Videos
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`/category/${ItemCategory.ART}`}
            className="fixed-width-button"
            variant="outline-secondary"
          >
            Art
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`/category/${ItemCategory.MERCHANDISING}`}
            className="fixed-width-button"
            variant="outline-secondary"
          >
            Merchandising
          </Nav.Link>
          <CartWidget />
          <Nav.Link href="#user" className="user-icon">
            <FaUser size={39} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
