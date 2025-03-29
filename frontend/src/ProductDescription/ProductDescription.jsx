import React, { useEffect, useState } from "react";
import "./ProductDescription.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductDescription = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    console.log("hello product id", ProductId);
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/getProduct/${ProductId}`
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
      2
      <div className="product-image">
        <img src={product.ImageUrl} alt={product.Name} className="img-fluid" />
      </div>
      <div className="product-details container mt-4">
        <div className="row">
          <div className="col-md-7">
            <h2
              className="product-titl"
              style={{
                textAlign: "center",
              }}
            >
              {product.Name}
            </h2>
            <p className="product-description">{product.Description}</p>
          </div>

          <div className="col-md-5">
            <div className="product-info">
              <h3 className="product-price">AED {product.PricePerKg}</h3>
              <Link to="/checkout" className="order-now-link">
                <button className="order-now-btn">
                  <span>Order Now</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
