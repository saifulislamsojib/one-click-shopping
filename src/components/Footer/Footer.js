import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <footer className="bg-info rounded-lg p-2 my-2">
        <p className="text-white text-center mb-0">
          &copy; {new Date().getFullYear()}, All Rights Reserved By One Click
          Shopping.
        </p>
      </footer>
    </Container>
  );
};

export default Footer;
