import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faSignOut,
  faUserPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import "./Navbar.css";

const navLinkClass = ({ isActive }) =>
  `nav-link site-nav__link${isActive ? " active" : ""}`;

function NavScrollExample({ isAdmin = false }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const initial = (user?.firstName || user?.email || "U").charAt(0).toUpperCase();

  const accountControls = (
    <div className="site-nav__actions">
      {!isAdmin && (
        <Link to="/checkout" className="cta-btn cta-btn--primary site-nav__cta">
          Order Now
          <FontAwesomeIcon icon={faArrowRight} className="cta-btn__arrow" />
        </Link>
      )}
      {isAuthenticated ? (
        <NavDropdown
          title={
            <span className="site-nav__avatar" aria-label="Account menu">
              {initial}
            </span>
          }
          id="profile-dropdown"
          align="end"
          className="site-nav__profile"
        >
          {user && (
            <div className="site-nav__profile-head">
              <div className="site-nav__profile-name">
                {user.firstName} {user.lastName}
              </div>
              <div className="site-nav__profile-email">{user.email}</div>
            </div>
          )}
          {!isAdmin && (
            <NavDropdown.Item as={Link} to="/signup">
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Signup</span>
            </NavDropdown.Item>
          )}
          <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} />
            <span>Logout</span>
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Link to="/login" className="cta-btn cta-btn--outline site-nav__login">
          <FontAwesomeIcon icon={faRightToBracket} />
          Login
        </Link>
      )}
    </div>
  );

  return (
    <Navbar expand="lg" sticky="top" className="site-nav" variant="light">
      <Container className="site-nav__container">
        <Navbar.Brand as={Link} to="/" className="site-brand">
          <img
            src="/eman-logo.png"
            alt="Eman Plastic Waste Recycling — Deals in all kind of Plastic and Metal Scrap"
            className="site-brand__logo"
          />
        </Navbar.Brand>
        {isAdmin ? (
          accountControls
        ) : (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" className="site-nav__toggle" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="mx-lg-auto site-nav__links" navbarScroll>
                <NavLink to="/" end className={navLinkClass}>
                  Home
                </NavLink>
                <NavDropdown
                  title="Products"
                  id="navbarScrollingDropdown"
                  className="site-nav__dropdown"
                >
                  <NavDropdown.Item as={Link} to="/products">
                    Scrap Items
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/usedscrap">
                    Used Items
                  </NavDropdown.Item>
                </NavDropdown>
                <NavLink to="/contactus" className={navLinkClass}>
                  Contact Us
                </NavLink>
                <NavLink to="/aboutus" className={navLinkClass}>
                  About Us
                </NavLink>
              </Nav>
              {accountControls}
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
