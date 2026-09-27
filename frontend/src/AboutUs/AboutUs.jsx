import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faEarthAmericas,
  faHandshake,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import "./AboutUs.css";

const materials = ["Zinc", "Aluminum", "Iron", "Brass", "Copper", "PP", "ABS", "HDPE"];
const usedItems = ["Refrigerators", "Air conditioners", "Washing machines", "Televisions"];

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="page-hero page-hero--about page-hero--compact">
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__eyebrow">Since 2005</span>
            <h1 className="page-hero__title">About Us</h1>
            <p className="page-hero__subtitle">
              Leading the way in sustainable scrap metal solutions since 2005.
            </p>
          </div>
        </div>
      </section>

      {/* Our Introduction */}
      <section className="section section--surface">
        <div className="container">
          <div className="about-intro">
            <div>
              <span className="eyebrow">Who we are</span>
              <h2 className="section-title">Our Introduction</h2>
              <p className="about-lead">
                Welcome to Eman Plastics Waste Recycling, proudly located in Al
                Badiya Industrial Estate. We are dedicated to sustainable waste
                management and recycling, dealing with a wide range of metal and
                plastic scrap materials. From zinc, aluminum, iron, brass, and
                copper to various plastic scrap types such as PP, ABS, and HDPE, we
                specialize in both the sale and purchase of these valuable
                materials. Additionally, we handle a broad selection of used items,
                including refrigerators, air conditioners, washing machines,
                televisions, and more.
              </p>
              <p>
                Our commitment to quality, reliability, and environmental
                responsibility positions us as a trusted partner for businesses and
                individuals alike.
              </p>
            </div>
            <aside className="about-materials">
              <h3 className="about-materials__title">Materials we trade</h3>
              <div className="about-materials__chips">
                {materials.map((m) => (
                  <span className="chip" key={m}>{m}</span>
                ))}
              </div>
              <h3 className="about-materials__title">Used items</h3>
              <div className="about-materials__chips">
                {usedItems.map((m) => (
                  <span className="chip chip--accent" key={m}>{m}</span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">What drives us</span>
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">
              At Eman Plastics Waste Recycling, our mission is to promote
              sustainable development by turning waste into resources. We are
              committed to:
            </p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <span className="icon-tile"><FontAwesomeIcon icon={faLeaf} /></span>
              <h3>Sustainability</h3>
              <p>
                Conserving natural resources and reducing landfill waste through
                responsible recycling solutions.
              </p>
            </div>
            <div className="mission-card">
              <span className="icon-tile"><FontAwesomeIcon icon={faEarthAmericas} /></span>
              <h3>Environmental Responsibility</h3>
              <p>
                Implementing eco-friendly practices that contribute to a cleaner,
                greener planet.
              </p>
            </div>
            <div className="mission-card">
              <span className="icon-tile"><FontAwesomeIcon icon={faHandshake} /></span>
              <h3>Customer Relationships</h3>
              <p>
                Building long-term partnerships with our clients and suppliers
                through ethical practices and exceptional service.
              </p>
            </div>
            <div className="mission-card">
              <span className="icon-tile"><FontAwesomeIcon icon={faScaleBalanced} /></span>
              <h3>Competitive Advantage</h3>
              <p>
                Providing fair prices, reliable solutions, and a commitment to
                continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section section--surface">
        <div className="container">
          <div className="about-journey">
            <span className="eyebrow">Our story</span>
            <h2 className="section-title">Our Journey</h2>
            <p className="about-lead">
              Our journey began with a vision to revolutionize the recycling
              industry by offering comprehensive solutions for both metal and
              plastic waste management. From humble beginnings, we have grown into
              a trusted name in the recycling sector, thanks to our unwavering
              focus on innovation, integrity, and customer satisfaction. Over the
              years, we have expanded our services to include a wide variety of
              used items, catering to the diverse needs of our clientele.
            </p>
            <blockquote className="about-quote">
              Every step we take is guided by our passion for sustainability and
              our belief in the transformative power of recycling to build a
              better, more sustainable future for generations to come.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Our Facility */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Behind the scenes</span>
            <h2 className="section-title">Inside Our Yard</h2>
            <p className="section-subtitle">
              A real look at our sorting, processing and storage yard in Al
              Badiya Industrial Estate — where every load is weighed, sorted
              and prepared by hand.
            </p>
          </div>
          <div className="facility-gallery">
            <figure className="facility-gallery__item">
              <img
                src="/gallery/yard-sorting-1.jpg"
                alt="Workers hand-sorting metal scrap in our yard"
                loading="lazy"
              />
              <figcaption>Hand-sorting metal scrap</figcaption>
            </figure>
            <figure className="facility-gallery__item">
              <img
                src="/gallery/yard-sorting-2.jpg"
                alt="Sorting aluminium and metal parts at our facility"
                loading="lazy"
              />
              <figcaption>Sorting incoming scrap</figcaption>
            </figure>
            <figure className="facility-gallery__item">
              <img
                src="/gallery/yard-warehouse.jpg"
                alt="Warehouse storage of processed metal scrap and appliances"
                loading="lazy"
              />
              <figcaption>Warehouse storage</figcaption>
            </figure>
            <figure className="facility-gallery__item">
              <img
                src="/gallery/yard-used-items.jpg"
                alt="Used household items collected for recycling"
                loading="lazy"
              />
              <figcaption>Used items yard</figcaption>
            </figure>
            <figure className="facility-gallery__item">
              <img
                src="/gallery/yard-scrap-piles.jpg"
                alt="Sorted scrap piles ready for processing"
                loading="lazy"
              />
              <figcaption>Sorted &amp; ready for processing</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">People</span>
            <h2 className="section-title">Our Team</h2>
          </div>
          <div className="team-grid">
            {[
              {
                img: "/irfanMehmoodPicture.jpg",
                name: "Syed Irfan Mahmud",
                position: "Department director",
              },
              {
                img: "/MalikAbdulSajidPicture.jpg",
                name: "Malik Abdul Sajid",
                position: "Operations Manager",
              },
              {
                img: "/MeharbanAliPicture.jpg",
                name: "Meharban Ali",
                position: "Sales Manager",
              },
              {
                img: "/Saeed Ali Khusaif Al HantoubiPicture.jpg",
                name: "Saeed Ali Khusaif Al Hantoubi",
                position: "Owner",
                // This photo is a close, non-studio crop (unlike the other
                // formal headshots), so covering the square card crops
                // pieces of it off. Showing it uncropped here only.
                fit: "contain",
              },
            ].map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-card__photo">
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className={member.fit === "contain" ? "team-card__photo-img--contain" : undefined}
                  />
                </div>
                <div className="team-card__body">
                  <h5 className="team-card__name">{member.name}</h5>
                  <p className="team-card__role">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
