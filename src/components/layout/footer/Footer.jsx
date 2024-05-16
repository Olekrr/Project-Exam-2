import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <Container className="p-4">
        <p>&copy; {new Date().getFullYear()} Holidaze. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
