import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faSignOut } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

function NavScrollExample() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="bg-body-tertiary"
      variant="light"
    >
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link">
              Home
            </Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <Link to="/products" className="nav-link">
                Scrap Items
              </Link>
              <Link to="/usedscrap" className="nav-link">
                Used Items
              </Link>
            </NavDropdown>

            <Link to="/contactus" className="nav-link">
              Contact Us
            </Link>
            <Link to="/aboutus" className="nav-link">
              About Us
            </Link>
            <Link to="/checkout" className="nav-link">
              Order Now
            </Link>
          </Nav>
          <Form className="d-flex">
            {isAuthenticated ? (
              <Nav className="ms-auto">
                <NavDropdown
                  title={
                    <span>
                      <img
                        src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                        alt="Profile"
                        className="rounded-circle"
                        width="30"
                        height="30"
                      />{" "}
                    </span>
                  }
                  id="profile-dropdown"
                  align="end"
                >
                  <NavDropdown.Item>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="nav-link"
                    >
                      <span>Signup </span>
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={handleLogout}
                      className="nav-link"
                    >
                      <span>Logout </span>
                      <FontAwesomeIcon icon={faSignOut} />
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FontAwesomeIcon icon={faRightToBracket} />
              </Link>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
