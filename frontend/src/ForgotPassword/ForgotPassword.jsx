import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import {
  forgotPassword as forgotPasswordAPI,
  resetPassword as resetPasswordAPI,
} from "../services/authService";

const ForgotPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  // step 1 = enter email, step 2 = enter code + new password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [sentCode, setSentCode] = useState(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const data = await forgotPasswordAPI(email);
      setSentCode(data.code);
      setSuccessMsg("A verification code has been sent to your email.");
      setStep(2);
    } catch (error) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Could not send the verification code. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const data = await forgotPasswordAPI(email);
      setSentCode(data.code);
      setSuccessMsg("A new verification code has been sent to your email.");
    } catch (error) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Could not resend the verification code. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (Number(code) !== Number(sentCode)) {
      setErrorMsg("The code you entered is incorrect.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordAPI(email, password);
      setSuccessMsg("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Password reset failed. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5}>
            <Card className="auth-card">
              <Card.Body>
                <div className="auth-card__header">
                  <img
                    src="/eman-logo-mark.png"
                    alt=""
                    className="auth-card__logo"
                    aria-hidden="true"
                  />
                  <h2 className="auth-card__title">Reset your password</h2>
                  <p className="auth-card__subtitle">
                    {step === 1
                      ? "Enter your account email and we’ll send you a verification code."
                      : "Enter the code we emailed you and choose a new password."}
                  </p>
                </div>

                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}

                {step === 1 && (
                  <Form onSubmit={handleSendCode}>
                    <Form.Group controlId="forgot-email" className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="email@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="success"
                      className="w-100 auth-card__submit"
                      disabled={loading}
                    >
                      {loading ? "Sending code…" : "Send verification code"}
                    </Button>
                  </Form>
                )}

                {step === 2 && (
                  <Form onSubmit={handleResetPassword}>
                    <Form.Group controlId="forgot-code" className="mb-3">
                      <Form.Label>Verification code</Form.Label>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        placeholder="6-digit code"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="forgot-password" className="mb-3">
                      <Form.Label>New password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="forgot-confirm-password" className="mb-2">
                      <Form.Label>Confirm new password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="auth-card__label-row mb-3">
                      <button
                        type="button"
                        className="auth-card__link-sm auth-card__link-btn"
                        onClick={handleResendCode}
                        disabled={loading}
                      >
                        Resend code
                      </button>
                      <button
                        type="button"
                        className="auth-card__link-sm auth-card__link-btn"
                        onClick={() => setStep(1)}
                      >
                        Change email
                      </button>
                    </div>

                    <Button
                      type="submit"
                      variant="success"
                      className="w-100 auth-card__submit"
                      disabled={loading}
                    >
                      {loading ? "Resetting…" : "Reset password"}
                    </Button>
                  </Form>
                )}

                <p className="auth-card__switch">
                  Remembered your password? <NavLink to="/login">Log in</NavLink>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
