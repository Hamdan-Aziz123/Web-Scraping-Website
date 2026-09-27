import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../components/ProductsSlider/ProductsSlider.css";
import "./CategoryProducts.css";
import { API_BASE_URL } from "../config/api";

const CATEGORY_LABELS = {
  metals: "Metals",
  plastics: "Plastics",
};

const PRODUCTS_PER_PAGE = 20;

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [currentPage, setCurrentPage] = useState(1);

  const categoryKey = (category || "").toLowerCase();
  const categoryLabel = CATEGORY_LABELS[categoryKey] || category;

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setStatus("loading");
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/getProducts`);
        const data = await response.json();
        if (!isMounted) return;
        setProducts(Array.isArray(data) ? data : []);
        setStatus("ready");
      } catch (error) {
        console.error(error);
        if (isMounted) setStatus("error");
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [categoryKey]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryKey]);

  const categoryProducts = products.filter(
    (product) => (product.Category || "").toLowerCase() === categoryKey
  );

  const totalPages = Math.ceil(categoryProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = categoryProducts.slice(indexOfFirst, indexOfLast);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .querySelector(".category-products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-shell category-products">
      <div className="container">
        <h1 className="visually-hidden">{categoryLabel} products</h1>

        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <Link to="/products">Products</Link>
          <span aria-hidden="true">/</span>
          <span>{categoryLabel}</span>
          {status === "ready" && (
            <span className="category-breadcrumb__count">
              ({categoryProducts.length} product{categoryProducts.length === 1 ? "" : "s"})
            </span>
          )}
        </nav>

        {status === "loading" && (
          <div className="surface-card admin-state">
            <p className="admin-state__text">Loading {categoryLabel.toLowerCase()} products…</p>
          </div>
        )}

        {status === "error" && (
          <div className="surface-card admin-state">
            <p className="admin-state__text">We couldn’t load these products. Is the backend running?</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()} type="button">
              Try again
            </button>
          </div>
        )}

        {status === "ready" && categoryProducts.length === 0 && (
          <div className="surface-card admin-state">
            <p className="admin-state__text">
              No {categoryLabel.toLowerCase()} products listed right now. Please check back soon.
            </p>
          </div>
        )}

        {status === "ready" && categoryProducts.length > 0 && (
          <>
            <div className="row g-3 g-md-4">
              {currentProducts.map((product) => (
                <div className="col-12 col-md-6 col-lg-4" key={product.ProductId}>
                  <div className="product-card">
                    <div className="product-card__media">
                      <img
                        src={product.ImageUrl}
                        alt={product.Name}
                        className="img-fluid"
                        loading="lazy"
                      />
                      {product.Category && (
                        <span className="chip product-card__chip">{product.Category}</span>
                      )}
                    </div>
                    <div className="product-card__body">
                      <h5>{product.Name}</h5>
                      <p className="product-card__price">
                        <strong>AED {product.PricePerKg}</strong>
                        <span className="product-card__unit"> / kg</span>
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
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <nav aria-label={`${categoryLabel} pages`} className="category-products__pagination">
                <ul className="pagination justify-content-center">
                  {paginationButtons.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${currentPage === number ? "active" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(number)}
                        aria-current={currentPage === number ? "page" : undefined}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
