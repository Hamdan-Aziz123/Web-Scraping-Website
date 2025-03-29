import React from "react";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          width: "100%",
          backgroundImage:
            "-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0.4))), url(https://t4.ftcdn.net/jpg/10/16/32/01/360_F_1016320126_divShnxC5DIUWtbi35GSazrKxBMS1b2r.jpg)",
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
            About Us
          </h1>
          <p>
            Leading the way in sustainable scrap metal solutions since 2005.
          </p>
        </div>
      </div>

      {/* Our Introduction */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center text-success mb-4">Our Introduction</h2>
          <p className="text-muted">
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
          <p className="text-muted">
            Our commitment to quality, reliability, and environmental
            responsibility positions us as a trusted partner for businesses and
            individuals alike.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center text-primary mb-4">Our Mission</h2>
          <p className="text-muted">
            At Eman Plastics Waste Recycling, our mission is to promote
            sustainable development by turning waste into resources. We are
            committed to:
          </p>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Sustainability:</strong> Conserving natural resources and
              reducing landfill waste through responsible recycling solutions.
            </li>
            <li className="list-group-item">
              <strong>Environmental Responsibility:</strong> Implementing
              eco-friendly practices that contribute to a cleaner, greener
              planet.
            </li>
            <li className="list-group-item">
              <strong>Customer Relationships:</strong> Building long-term
              partnerships with our clients and suppliers through ethical
              practices and exceptional service.
            </li>
            <li className="list-group-item">
              <strong>Competitive Advantage:</strong> Providing fair prices,
              reliable solutions, and a commitment to continuous improvement.
            </li>
          </ul>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center text-info mb-4">Our Journey</h2>
          <p className="text-muted">
            Our journey began with a vision to revolutionize the recycling
            industry by offering comprehensive solutions for both metal and
            plastic waste management. From humble beginnings, we have grown into
            a trusted name in the recycling sector, thanks to our unwavering
            focus on innovation, integrity, and customer satisfaction. Over the
            years, we have expanded our services to include a wide variety of
            used items, catering to the diverse needs of our clientele.
          </p>
          <p className="text-muted">
            Every step we take is guided by our passion for sustainability and
            our belief in the transformative power of recycling to build a
            better, more sustainable future for generations to come.
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center text-danger mb-4">Our Team</h2>
          <div className="row text-center">
            {[
              {
                img: "/irfanMehmoodPicture.jpg",
                name: "Syed Irfan Mahmud",
                position: "Managing Director",
              },
              {
                img: "/MuhammadJahangirPicture.jpg",
                name: "Muhammad Jahangir",
                position: "Sales Manager",
              },
              {
                img: "/MalikAbdulJabbarPicture.jpg",
                name: "Malik Abdul Jabbar",
                position: "Sales Manager",
              },
              {
                img: "/Saeed Ali Khusaif Al HantoubiPicture.jpg",
                name: "Saeed Ali Khusaif Al Hantoubi",
                position: "Business Partner",
              },
            ].map((member, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow-sm border-0">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="card-img-top rounded-circle mx-auto mt-3"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="text-muted">{member.position}</p>
                  </div>
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
