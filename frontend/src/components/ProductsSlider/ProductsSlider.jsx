import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "./ProductsSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ProductsSlider = ({ products }) => {
  return (
    <Swiper
      className="mySwiper"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      breakpoints={{
        360: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        900: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1120: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
      }}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="product-card">
            <img
              src={product.ImageUrl}
              alt={product.Name}
              className="img-fluid"
            />
            <h5>{product.Name}</h5>
            <p>
              <strong>AED {product.PricePerKg}</strong>
            </p>
            <Link
              to={`/productdescription/${product.ProductId}`}
              className="product-link"
            >
              <button className="view-more-button">
                <span>View More</span>
              </button>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsSlider;
