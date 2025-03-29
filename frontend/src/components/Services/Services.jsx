import React from "react";
import "./Services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDumpster, 
  faHouse, 
  faRecycle, 
  faBuilding, 
  faTruck, 
  faShop 
} from "@fortawesome/free-solid-svg-icons"; 

const services = [
  {
    title: "Scrap Collection",
    description: "Quick and efficient doorstep collection of all kinds of scrap materials, including metal, plastic, paper, and more.",
    icon: faRecycle,
  },
  {
    title: "Society Tie-up Service",
    description: "Serving the Residential Societies in achieving their zero waste goals.",
    icon: faBuilding,
  },
  {
    title: "Shredding Service",
    description: "Aiding Businesses in the safe & secure disposal of their confidential documents.",
    icon: faDumpster,
  },
  {
    title: "E-Waste Recycling & Recovery",
    description: "Specialized services for safe disposal and recovery of valuable materials from electronic waste.",
    icon: faTruck,
  },
  {
    title: "Dismantling Service",
    description: "Providing a holistic approach to implement circular solutions to the scrap disposal.",
    icon: faHouse,
  },
  {
    title: "Garage Sale",
    description: "Serving the Residential Societies in achieving garage sale service.",
    icon: faShop,
  },
];

const Services = () => {
  return (
    <div className="services-section">
      <h2 className="services-title">Our Services</h2>
      <p className="services-subtitle">Attaining sustainable solutions with ease.</p>
      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <FontAwesomeIcon icon={service.icon} className="service-icon" />
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
