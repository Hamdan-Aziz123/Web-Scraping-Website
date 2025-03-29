import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ContactUs = () => {
  const ContactPageStyle = {
    backgroundImage:
      "-webkit-gradient(linear, left top, left bottom, from(rgba(28,72,102,0.3)), to(rgba(28,72,102,0.3))), url(ContactUsBcakground.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "50px 0",
    width: "100%",
    height: "100%",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const submitMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/contactus/saveMessage",
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
    <div className="contactBody" style={ContactPageStyle}>
      <Container className="formStyle" style={{ margin: "100px auto" }}>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <Row className="justify-content-center text-center">
          <Col md={12}>
            <h2
              style={{ fontSize: "40px", marginBottom: "20px", color: "White" }}
            >
              GET IN TOUCH
            </h2>
            <p style={{ fontSize: "18px", color: "White" }}>
              <i className="fa fa-phone"></i> Phone: 00971525742383 /
              00971564881535
            </p>
            <p style={{ fontSize: "18px", color: "White" }}>
              <i className="fa fa-envelope"></i> Email:
              Emanplasticrecycling1@gmail.com
            </p>
            <p style={{ fontSize: "18px", color: "White" }}>
              <i className="fa fa-map-marker"></i> Address: Eman plastics waste
              recycling Al bidya industrial estate ,Fujairah UAE
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Control
                  type="text"
                  placeholder="YOUR NAME *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    border: "1px solid grey",
                    color: "#000",
                    padding: "20px",
                    marginBottom: "15px",
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="YOUR EMAIL *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    border: "1px solid grey",
                    color: "#000",
                    padding: "20px",
                    marginBottom: "15px",
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Control
                  type="text"
                  placeholder="YOUR PHONE *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    border: "1px solid grey",
                    color: "#000",
                    padding: "20px",
                    marginBottom: "15px",
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="YOUR MESSAGE *"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    border: "1px solid grey",
                    color: "#000",
                    padding: "20px",
                    marginBottom: "15px",
                  }}
                />
              </Form.Group>

              <Button
                type="submit"
                style={{
                  backgroundColor: "#e33f43",
                  border: "none",
                  padding: "10px 30px",
                  fontSize: "18px",
                }}
              >
                SEND MESSAGE
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
