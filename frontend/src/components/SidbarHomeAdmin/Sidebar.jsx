import React from "react";
import "./Sidebar.css";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faList,
  faCartShopping,
  faEnvelope,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  // Admin lands on "/" by default, which also renders the Add Product
  // page — but "/" doesn't match the "/addproduct" NavLink, so it never
  // got highlighted. Treat "/" as the Add Items page for the sidebar too.
  const location = useLocation();
  const isAddItemsActive = location.pathname === "/" || location.pathname.startsWith("/addproduct");

  return (
    <Nav className="sidebar" as="nav" aria-label="Admin navigation">
      <div className="sidebar-heading">Admin Panel</div>
      <div className="sidebar-options">
        <NavLink
          to="/addproduct"
          className={({ isActive }) =>
            `sidebar-option${isActive || isAddItemsActive ? " active" : ""}`
          }
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/listproducts" className="sidebar-option">
          <FontAwesomeIcon icon={faList} />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/ViewOrdersAdmin" className="sidebar-option">
          <FontAwesomeIcon icon={faCartShopping} />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/showmsgs" className="sidebar-option">
          <FontAwesomeIcon icon={faEnvelope} />
          <p>Messages</p>
        </NavLink>
        <NavLink to="/usersShow" className="sidebar-option">
          <FontAwesomeIcon icon={faUsers} />
          <p>Users</p>
        </NavLink>
      </div>
    </Nav>
  );
};

export default Sidebar;
