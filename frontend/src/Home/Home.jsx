import React from "react";
import TextAndStats from "../components/Utils/TextAndStats";
import Services from "../components/Services/Services";
import Qualities from "../components/Qualities/Qualities";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCartShopping,
  faHandHoldingDollar,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="page-hero page-hero--home page-hero--compact">
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__eyebrow">
              <FontAwesomeIcon icon={faRecycle} /> Fujairah, UAE
            </span>
            <h1 className="page-hero__title page-hero__title--long">
              EMAN PLASTIC WASTE RECYCLING
            </h1>
            <p className="page-hero__subtitle">
              Deals in all kind of Plastic and Metal Scrap
            </p>
            <div className="page-hero__actions">
              <Link to="/checkout" className="cta-btn cta-btn--accent">
                Order Now
                <FontAwesomeIcon icon={faArrowRight} className="cta-btn__arrow" />
              </Link>
              <Link to="/contactus" className="cta-btn cta-btn--ghost-light">
                Sell Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Services />

      <section className="section section--surface">
        <div className="container">
          <div className="trade-grid">
            <div className="trade-card">
              <span className="icon-tile">
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <div className="trade-card__body">
                <h3 className="trade-card__title">Buying</h3>
                <p className="trade-card__text">
                  Make a purchase effortlessly. Simply provide your details and
                  the product information you need, and we’ll handle the rest
                  for a seamless transaction.
                </p>
                <Link to="/checkout" className="order-now-link">
                  <button className="cta-btn cta-btn--primary order-now-btn">
                    <span>Order Now</span>
                    <FontAwesomeIcon icon={faArrowRight} className="cta-btn__arrow" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="trade-card trade-card--accent">
              <span className="icon-tile icon-tile--accent">
                <FontAwesomeIcon icon={faHandHoldingDollar} />
              </span>
              <div className="trade-card__body">
                <h3 className="trade-card__title">Selling</h3>
                <p className="trade-card__text">
                  Have products to sell? Share your details and offer, including
                  what you want to sell, and we’ll contact you to discuss your
                  proposal further.
                </p>
                <Link to="/contactus" className="sell-now-link">
                  <button className="cta-btn cta-btn--outline sell-now-btn">
                    <span>Sell Now</span>
                    <FontAwesomeIcon icon={faArrowRight} className="cta-btn__arrow" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="facility-banner">
        <div className="container facility-banner__row">
          <div className="facility-banner__media">
            <img
              src="/gallery/yard-sorting-1.jpg"
              alt="Our team hand-sorting metal scrap at the Eman Plastics yard in Fujairah"
              className="facility-banner__img"
              loading="lazy"
            />
          </div>
          <div className="facility-banner__content">
            <span className="eyebrow">See it for yourself</span>
            <h2 className="facility-banner__title">
              Real People. Real Scrap. Real Recycling.
            </h2>
            <p className="facility-banner__text">
              A genuine look inside our Al Badiya yard, where every load is
              sorted and processed by hand.
            </p>
            <Link to="/aboutus" className="cta-btn cta-btn--accent">
              See Our Facility
              <FontAwesomeIcon icon={faArrowRight} className="cta-btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      <TextAndStats />
      <Qualities />
    </div>
  );
};

export default Home;
