import React from "react";
import "./Qualities.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faRecycle,
  faBalanceScale,
  faShieldAlt,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons"; 

const qualities = [
  {
    title: "Convenient Pickup",
    description: "Schedule doorstep pickup of recyclable materials at your preferred time.",
    icon: faTruck,
  },
  {
    title: "Eco-Friendly Disposal",
    description: "Ensure environmentally responsible disposal of all collected scrap.",
    icon: faRecycle,
  },
  {
    title: "Transparent Weighting",
    description: "Digital scales ensure fair and accurate measurement of recyclables.",
    icon: faBalanceScale,
  },
  {
    title: "Verified Team",
    description: "Trained and trustworthy staff to handle your scrap responsibly.",
    icon: faShieldAlt,
  },
  {
    title: "Easy Transactions",
    description: "Choose from cash, bank transfer, or digital wallet payments.",
    icon: faHandshake,
  },
];

const Qualities = () => {
  return (
    <div className="qualities-section">
      <h2 className="qualities-title">Why Choose Us</h2>
      <p className="qualities-subtitle">
        A simple, smart web-based solution for all your discard needs.
      </p>
      <div className="qualities-container">
        {qualities.map((quality, index) => (
          <div key={index} className="quality-card">
            <div className="icon-container">
              <FontAwesomeIcon icon={quality.icon} className="quality-icon" />
            </div>
            <h3 className="quality-title">{quality.title}</h3>
            <p className="quality-description">{quality.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qualities;
