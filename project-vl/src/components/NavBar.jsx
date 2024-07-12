import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  Nav,
  InputGroup,
  Button,
} from "react-bootstrap";
import { FaUser, FaSearch } from "react-icons/fa";
import logo from "../assets/images/VLLogo.png";
import CartWidget from './CartWidget';
import "./NavBar.css";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar navbar-bg-light fixed-top">
      <Navbar.Brand href="#home">
        <img src={logo} className="navbar-logo" alt="Logo" />
      </Navbar.Brand>
      <Form inline className="search-form">
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
          <Button variant="outline-secondary" className="fixed-width-button">
            Clips
          </Button>
          <Button variant="outline-secondary" className="fixed-width-button">
            Art
          </Button>
          <Button variant="outline-secondary" className="fixed-width-button">
            Merchandising
          </Button>
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
