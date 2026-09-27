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
import { loginUser, googleLoginUser } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleLogin } from "@react-oauth/google";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary.jsx";

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
    setErrorMsg("Google sign-in failed. Please try again.");
  };

  // Google Identity Services installs its own global click listener to
  // detect "outside clicks" for its account picker/One Tap UI. That
  // listener runs in the capture phase and can occasionally swallow a
  // click before it ever reaches React's event handling, which is what
  // made "Create Now" unresponsive. Listening on `window` in the capture
  // phase runs before that listener does (window's capture phase always
  // fires first), so this guarantees the navigation happens regardless.
  useEffect(() => {
    // TEMP DEBUG: logs every click anywhere on the page so we can see what
    // element actually receives the click when "Create Now" is pressed.
    // Safe to ignore/remove once we've confirmed the fix.
    const logAnyClick = (e) => {
      console.log(
        "[switch-link-debug] window capture click on:",
        e.target.tagName,
        e.target.className
      );
    };
    window.addEventListener("click", logAnyClick, true);

    const handleSwitchLinkClick = (e) => {
      const link = e.target.closest?.(".auth-card__switch-link");
      if (link) {
        console.log("[switch-link-debug] matched switch link, navigating to", link.getAttribute("href"));
        e.preventDefault();
        navigate(link.getAttribute("href"));
      }
    };
    window.addEventListener("click", handleSwitchLinkClick, true);
    return () => {
      window.removeEventListener("click", logAnyClick, true);
      window.removeEventListener("click", handleSwitchLinkClick, true);
    };
  }, [navigate]);

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5}>
            <Card className="auth-card">
              <Card.Body>
                <div className="auth-card__header">
                  <img src="/eman-logo-mark.png" alt="" className="auth-card__logo" aria-hidden="true" />
                  <h2 className="auth-card__title">Login to your Account</h2>
                  <p className="auth-card__subtitle">
                    Welcome Back :) Start your personal experience...
                  </p>
                </div>

                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}

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

                  <Form.Group controlId="password" className="mb-2">
                    <div className="auth-card__label-row">
                      <Form.Label>Password</Form.Label>
                      <NavLink to="/forgot-password" className="auth-card__link-sm">
                        Forgot password?
                      </NavLink>
                    </div>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success" className="w-100 auth-card__submit">
                    Login Now
                  </Button>
                </Form>

                <div className="auth-card__divider"><span>or</span></div>

                <div className="google-signin">
                  <Button
                    variant="outline-primary"
                    className="w-100 google-signin__visible"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
                  </Button>
                  <div className="google-signin__overlay">
                    <ErrorBoundary>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        shape="rectangular"
                        width="320"
                      />
                    </ErrorBoundary>
                  </div>
                </div>

                <p className="auth-card__switch">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="auth-card__switch-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    Create Now
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
