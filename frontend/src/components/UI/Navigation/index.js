import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Navigation = () => {
  const history = useHistory();
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>TODOLIST PROJECT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/dashboard">
                Home
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link
            className="mr-sm-2"
            onClick={() => {
              localStorage.clear();
              history.push({
                pathname: "/",
                state: {
                  msg: "Logout Success",
                },
              });
            }}
          >
            Logout
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
