import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="social-row">
          <Col className="text-center">
            <ul className="social-icons">
              <li>
                <a href="/" className="footer-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="/" className="footer-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="/" className="footer-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="footer-content">
          <Col xs={6} md={6} className="footer-section text-left">
            <h5>Support</h5>
            <ul className="footer-links">
              <li>00971525742383 / 00971564881535</li>
              <li>Emanplasticrecycling1@gmail.com</li>
            </ul>
          </Col>
          <Col xs={6} md={6} className="footer-section text-left">
            <h5>Help</h5>
            <ul className="footer-links">
              <li>
                <a href="/aboutus">About Us</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
              <li>
                <a href="/checkout">Order Now</a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p className="copyright">© 2019 - All Rights Are Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
