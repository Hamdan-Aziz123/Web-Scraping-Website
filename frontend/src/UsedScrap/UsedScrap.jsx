import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UsedScrap.css";
import { API_BASE_URL } from "../config/api";

const UsedScrap = () => {
  const [productsData, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/getUsedItems`);
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoaded(true);
      }
    };
    fetchProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // 3 rows of 3 on desktop

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page (and bring the grid back into view)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.querySelector(".used-items")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Generate pagination buttons
  const totalPages = Math.ceil(productsData.length / productsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <section className="page-hero page-hero--used page-hero--compact">
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__eyebrow">Second-hand</span>
            <h1 className="page-hero__title">Used Items</h1>
            <p className="page-hero__subtitle">
              Refrigerators, air conditioners, washing machines, televisions and more.
            </p>
          </div>
        </div>
      </section>

      <section className="section used-items">
        <div className="container">
          <div className="row g-3 g-md-4">
            {currentProducts.map((product) => (
              <div className="col-6 col-lg-4" key={product.ProductId}>
                <div className="used-card">
                  <div className="used-card__media">
                    <img src={product.ImageUrl} alt={product.Name} loading="lazy" />
                  </div>
                  <div className="used-card__body">
                    <h5 className="used-card__title">{product.Name}</h5>
                    <p className="used-card__price">AED {product.PricePerKg}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loaded && productsData.length === 0 && (
            <p className="used-items__empty">No used items listed right now. Please check back soon.</p>
          )}

          {/* Pagination — only when there is more than one page */}
          {totalPages > 1 && (
          <nav aria-label="Used items pages" className="used-items__pagination">
            <ul className="pagination justify-content-center">
              {paginationButtons.map((number) => (
                <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
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
        </div>
      </section>
    </>
  );
};

export default UsedScrap;
