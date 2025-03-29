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
    <div
      className="text-container"
      style={{ padding: "20px 40px", background: "#f0f2f5" }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={12}>
          <div
            style={{
              padding: "20px",
              background: "#f0f2f5",
              textAlign: "center",
            }}
          >
            <Title level={0}>Welcome to Eman Plastics Waste Recycling</Title>
            <Paragraph style={{ fontSize: "20px" }}>
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

        <Col xs={24} md={12}>
          <div
            ref={ref}
            className="stats-container"
            style={{ padding: "20px", background: "#002766", color: "#fff" }}
          >
            <Title
              level={4}
              style={{ color: "#fff", fontSize: "24px", textAlign: "center" }}
            >
              LET THE NUMBERS TALK
            </Title>
            <Row gutter={[16, 16]} justify="center">
              {stats.map((stat, index) => (
                <Col key={index} xs={24} sm={12} md={12} lg={12}>
                  <div style={{ textAlign: "center" }}>
                    <Title
                      level={1}
                      style={{ color: "#fff", margin: 0, fontSize: "48px" }}
                    >
                      <AnimatedNumber
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        startAnimation={startAnimation}
                      />
                    </Title>
                    <Title
                      level={5}
                      style={{ color: "#fff", fontSize: "16px" }}
                    >
                      {stat.description}
                    </Title>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TextAndStats;
