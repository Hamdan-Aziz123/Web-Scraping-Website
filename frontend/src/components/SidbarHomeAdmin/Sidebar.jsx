import React from "react";
import "./Sidebar.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faList,
  faCartShopping,
  faEnvelope,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <Nav className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/addproduct" className="sidebar-option">
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
