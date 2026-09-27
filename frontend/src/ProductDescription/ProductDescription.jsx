import React, { useEffect, useState } from "react";
import "./ProductDescription.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const ProductDescription = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    console.log("hello product id", ProductId);
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/products/getProduct/${ProductId}`
        );
        const data = await response.json();
        console.log("hello data in product description", data);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="product-description-container">
      <div className="container">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link to="/products">Products</Link>
          <span aria-hidden="true">/</span>
          <span>{product.Name}</span>
        </nav>

        <div className="product-layout">
          <div className="product-image">
            <img src={product.ImageUrl} alt={product.Name} className="img-fluid" />
          </div>

          <div className="product-details">
            {product.Category && <span className="chip">{product.Category}</span>}
            <h1 className="product-title">{product.Name}</h1>

            <div className="product-info">
              <div className="product-price-row">
                <h3 className="product-price">AED {product.PricePerKg}</h3>
                <span className="product-price-unit">per kg</span>
              </div>
              {product.QuantityInStock !== undefined && product.QuantityInStock !== null && (
                <p className="product-stock">
                  <span className="product-stock__dot" aria-hidden="true"></span>
                  {product.QuantityInStock} in stock
                </p>
              )}
              <Link to="/checkout" className="order-now-link">
                <button className="cta-btn cta-btn--primary cta-btn--block">
                  <span>Order Now</span>
                  <span className="cta-btn__arrow" aria-hidden="true">→</span>
                </button>
              </Link>
              <p className="product-info__note">
                Our team confirms availability and the final amount after you
                place your order.
              </p>
            </div>

            <div className="product-description-block">
              <h2 className="product-description-block__title">Description</h2>
              <p className="product-description">{product.Description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
