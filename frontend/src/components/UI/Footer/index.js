import React from "react";
import "./style.css";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
          <hr />
        <p className="text-center footer">Created for Teknokasi @ 2021</p>
      </Container>
    </footer>
  );
};

export default Footer;
