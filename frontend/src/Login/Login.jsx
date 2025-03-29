import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userData = { email, password };
    const response = await dispatch(loginUser(userData));
    if (response.payload) {
      if (response.payload.error) {
        if (response.payload.error === "Email or Password Incorrect") {
          setErrorMsg("Email or Password Incorrect");
        } else {
          setErrorMsg("please try again later");
        }
      }
      if (response.payload.message) {
        setSuccessMsg(response.payload.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    e.preventDefault();
    handleLogin();
    await setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <Container
      style={{
        margin: "100px auto",
      }}
    >
      <Row className="justify-content-center">
        <Col xs={12} md={6} sm={12} lg={6} xl={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login to your Account</h2>
              <div className="d-flex justify-content-between mb-3">
                <p>Don't have an account?</p>
                <NavLink to="/signup">
                  <Button variant="primary">Create Now</Button>
                </NavLink>
              </div>

              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              {successMsg && <Alert variant="success">{successMsg}</Alert>}

              <h3 className="text-center">Welcome Back :)</h3>
              <p className="text-center">Start your personal experience...</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to="/forgot-password">Forgot password?</NavLink>
                  <Button type="submit" variant="success">
                    Login Now
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                <Button variant="outline-primary" className="mt-2">
                  <i className="fab fa-google"></i> Sign in with Google
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
