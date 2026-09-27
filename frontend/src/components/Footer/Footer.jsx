import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footer__container">
        <Row className="footer-content gy-5">
          <Col lg={5} md={12} className="footer-section">
            <div className="footer-brand">
              <img
                src="/eman-logo.png"
                alt="Eman Plastic Waste Recycling — Deals in all kind of Plastic and Metal Scrap"
                className="footer-brand__logo"
              />
            </div>
            <p className="footer-about">
              Sustainable waste management and recycling — buying and selling
              metal, plastic scrap and used items from Al Badiya Industrial
              Estate, Fujairah.
            </p>
            <ul className="social-icons">
              <li>
                <a href="/" className="footer-link" aria-label="Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li>
                <a href="/" className="footer-link" aria-label="Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="/" className="footer-link" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={4} sm={7} className="footer-section">
            <h5>Support</h5>
            <ul className="footer-links footer-contact">
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <span>
                  <a href="tel:00971525742383">00971525742383</a> /{" "}
                  <a href="tel:00971564881535">00971564881535</a>
                </span>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>
                  <a href="mailto:Emanplasticrecycling1@gmail.com">Emanplasticrecycling1@gmail.com</a>
                </span>
              </li>
              <li>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Al Badiya Industrial Estate, Fujairah, UAE</span>
              </li>
            </ul>
          </Col>

          <Col lg={3} sm={5} className="footer-section">
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

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Eman Plastic Waste Recycling. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
