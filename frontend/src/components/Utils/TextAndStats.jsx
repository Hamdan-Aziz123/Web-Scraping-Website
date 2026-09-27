import React, { useState } from "react";
import { Row, Col, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./TextAndStats.css";

const { Title, Paragraph } = Typography;

const stats = [
  {
    prefix: "",
    suffix: " Tons",
    value: 1000,
    description: "Plastic Waste Recycled Annually",
  },
  {
    prefix: "",
    suffix: "+",
    value: 15,
    description: "Years in Sustainable Recycling",
  },
  {
    prefix: "",
    suffix: "%",
    value: 85,
    description: "Reduction in Landfill Contributions",
  },
  {
    prefix: "",
    suffix: "",
    value: 5000,
    description: "Clients Served Globally",
  },
];

const AnimatedNumber = ({ value, prefix, suffix, startAnimation }) => (
  <span>
    {prefix}
    <CountUp end={startAnimation ? value : 0} duration={2} separator="," />
    {suffix}
  </span>
);

const TextAndStats = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [startAnimation, setStartAnimation] = useState(false);

  const handleLearnMoreClick = () => {
    navigate("/aboutus");
  };

  if (inView && !startAnimation) {
    setStartAnimation(true);
  }

  return (
    <section className="section">
      <div className="container">
        <div className="text-container">
          <Row gutter={[24, 32]} align="middle">
            <Col xs={24} lg={13}>
              <div className="text-container__intro">
                <span className="eyebrow">About the company</span>
                <Title level={2} className="text-container__title">
                  Welcome to Eman Plastics Waste Recycling
                </Title>
                <Paragraph className="text-container__text">
                  Located in Al Badiya Industrial Estate, we are dedicated to
                  sustainable waste management and recycling. We deal with metal and
                  plastic scrap materials, from zinc, aluminum, and brass to PP,
                  ABS, and HDPE plastics. Additionally, we specialize in used items
                  such as refrigerators, air conditioners, and televisions. Our
                  commitment to quality and environmental responsibility makes us a
                  trusted partner for businesses and individuals alike.
                </Paragraph>
                <Button
                  type="primary"
                  className="gradient-btn"
                  onClick={handleLearnMoreClick}
                >
                  Learn More
                </Button>
              </div>
            </Col>

            <Col xs={24} lg={11}>
              <div ref={ref} className="stats-container">
                <Title level={4} className="stats-container__heading">
                  LET THE NUMBERS TALK
                </Title>
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div className="stat-item" key={index}>
                      <div className="stat-item__value">
                        <AnimatedNumber
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          startAnimation={startAnimation}
                        />
                      </div>
                      <div className="stat-item__label">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default TextAndStats;
