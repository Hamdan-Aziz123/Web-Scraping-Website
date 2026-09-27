import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../config/api";
import "./Contactus.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const submitMessage = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/contactus/saveMessage`,
        {
          name: name,
          email: email,
          phone: phone,
          message: message,
        }
      );

      if (response.status === 200) {
        setSuccessMsg("Your message has been sent successfully!");
        setErrorMsg("");
      } else {
        setSuccessMsg("");
        setErrorMsg(
          "There was an error sending your message. Please try again."
        );
      }
    } catch (err) {
      setSuccessMsg("");
      setErrorMsg("There was an error sending your message. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      setErrorMsg("All fields are required.");
      return;
    }

    submitMessage();
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");

    window.scrollTo(0, 0);
  };

  return (
    <div className="contactBody">
      <Container className="formStyle">
        <div className="contact-intro">
          <span className="eyebrow">Contact</span>
          <h1 className="contact-intro__title">GET IN TOUCH</h1>
          <p className="contact-intro__text">
            Want to buy, or have scrap to sell? Send us a message and our team
            will get back to you.
          </p>
        </div>

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Row className="g-4 align-items-stretch">
          <Col lg={5}>
            <div className="contact-info">
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <div>
                  <div className="contact-info__label">Phone</div>
                  <div className="contact-info__value">
                    <a href="tel:00971525742383">00971525742383</a> /{" "}
                    <a href="tel:00971564881535">00971564881535</a>
                  </div>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <div>
                  <div className="contact-info__label">Email</div>
                  <div className="contact-info__value">
                    <a href="mailto:Emanplasticrecycling1@gmail.com">
                      Emanplasticrecycling1@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-info__item">
                <span className="contact-info__icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <div>
                  <div className="contact-info__label">Address</div>
                  <div className="contact-info__value">
                    Eman plastics waste recycling Al bidya industrial estate
                    ,Fujairah UAE
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <div className="contact-form-card">
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="YOUR NAME *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="YOUR PHONE *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="YOUR EMAIL *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="YOUR MESSAGE *"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" className="contact-submit">
                  SEND MESSAGE
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
