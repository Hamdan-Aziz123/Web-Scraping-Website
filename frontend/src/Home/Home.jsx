import React from "react";
import TextAndStats from "../components/Utils/TextAndStats";
import Services from "../components/Services/Services";
import Qualities from "../components/Qualities/Qualities";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          width: "100%",
          backgroundImage:
            "-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0.5))), url(homepageTop.jpg)",
          backgroundSize: "cover",
          color: "white",
          fontFamily: "Poppins,Arial",
        }}
      >
        <div
          style={{
            paddingBottom: "130px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "700",
            }}
          >
            EMAN PLASTICS
          </h1>
          <p>Waste Recycling</p>
        </div>
      </div>
      <Services />
      <div className="container my-5">
        <div
          className="card p-4"
          style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
        >
          <h3 className="card-title">Buying</h3>
          <p className="card-text">
            Make a purchase effortlessly. Simply provide your details and the
            product information you need, and we’ll handle the rest for a
            seamless transaction.
          </p>
          <Link to="/checkout" className="order-now-link">
            <button className="order-now-btn">
              <span>Order Now</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="container my-5">
        <div
          className="card p-4"
          style={{ backgroundColor: "#f8f9fa", color: "#343a40" }}
        >
          <h3 className="card-title">Selling</h3>
          <p className="card-text">
            Have products to sell? Share your details and offer, including what
            you want to sell, and we’ll contact you to discuss your proposal
            further.
          </p>
          <Link to="/contactus" className="sell-now-link">
            <button className="sell-now-btn">
              <span>Sell Now</span>
            </button>
          </Link>
        </div>
      </div>
      <TextAndStats />
      <Qualities />
    </div>
  );
};

export default Home;
