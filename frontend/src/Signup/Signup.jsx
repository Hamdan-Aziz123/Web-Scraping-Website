import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerUser, googleLoginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary.jsx";

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const userData = { email, firstName, lastName, phone, password };
    const response = await dispatch(registerUser(userData));
    if (response.meta.requestStatus !== "fulfilled") {
      const error = response.payload?.error || response.payload;
      if (error === "User Already Exists or Signup Failed") {
        setErrorMsg("User Already Exists or Signup Failed");
      } else {
        setErrorMsg("please try again later");
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    e.preventDefault();
    const signedUp = await handleSignUp();
    if (signedUp) {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setSuccessMsg("");
      navigate("/");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMsg("");
    setSuccessMsg("");
    const response = await dispatch(googleLoginUser(credentialResponse.credential));
    if (response.payload) {
      if (response.payload.error) {
        setErrorMsg(response.payload.error);
      } else {
        navigate("/");
      }
    }
  };

  const handleGoogleError = () => {
    setErrorMsg("Google sign-up failed. Please try again.");
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="auth-card">
              <Card.Body>
                <div className="auth-card__header">
                  <img src="/eman-logo-mark.png" alt="" className="auth-card__logo" aria-hidden="true" />
                  <h1 className="auth-card__title">Create Your Account</h1>
                  <p className="auth-card__subtitle">Join Us! Let’s get you set up.</p>
                </div>

                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="email@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Your Phone Number"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm Password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit" className="w-100 auth-card__submit">
                    Sign Up
                  </Button>
                </Form>

                <div className="auth-card__divider"><span>or</span></div>

                <div className="google-signin" aria-label="Sign up with Google">
                  <ErrorBoundary>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      shape="rectangular"
                      width="320"
                    />
                  </ErrorBoundary>
                </div>

                <p className="auth-card__switch">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="auth-card__switch-link"
                  >
                    Log in
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
