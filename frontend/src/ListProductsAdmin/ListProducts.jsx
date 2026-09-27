import React, { useEffect, useState } from "react";
import "./ListProducts.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../config/api";

const ListProducts = () => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoadError(false);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/productsfetch`,
        {},
        { timeout: 15000 }
      );
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching Products:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  // Load the list as soon as the page opens
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (title) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/deleteproduct`, {
        data: { Title: title },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };

  const handleEditClick = (Product) => {
    navigate(`/updateproduct/${encodeURIComponent(Product.Name)}`);
  };

  const categories = [...new Set(Products.map((p) => p.Category).filter(Boolean))];

  const filteredProducts = Products.filter((item) => {
    const matchesCategory = categoryFilter === "All" || item.Category === categoryFilter;
    const matchesSearch = (item.Name || "")
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2 className="admin-page__title">All Products List</h2>
          <p className="admin-page__subtitle">
            {Products.length > 0
              ? `${filteredProducts.length} of ${Products.length} products`
              : "Edit or delete products listed on the website."}
          </p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar__search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="admin-toolbar__search-icon" />
          <input
            type="search"
            className="form-control"
            placeholder="Search by product name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products by name"
          />
        </div>
        <select
          className="form-select admin-toolbar__select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter products by category"
        >
          <option value="All">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-hover admin-table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {(filteredProducts.length === 0 || loadError) && (
              <tr>
                <td colSpan={5} className="admin-empty">
                  {loading ? (
                    "Loading products…"
                  ) : loadError ? (
                    <span className="admin-error">
                      Couldn’t load products. Is the backend running?{" "}
                      <button className="btn btn-outline-primary btn-sm" onClick={() => { setLoading(true); fetchProducts(); }}>
                        Try again
                      </button>
                    </span>
                  ) : Products.length === 0 ? (
                    "No products yet."
                  ) : (
                    "No products match your search."
                  )}
                </td>
              </tr>
            )}
            {filteredProducts.map((item, index) => (
              <tr key={index}>
                <td className="admin-table__media">
                  <img
                    src={item.ImageUrl}
                    alt="product"
                    className="admin-thumb"
                  />
                </td>
                <td className="admin-cell-strong admin-table__title" data-label="Title">{item.Name}</td>
                <td data-label="Category">
                  <span className="chip">{item.Category}</span>
                </td>
                <td data-label="Price">AED {item.PricePerKg}/-</td>
                <td className="admin-table__actions">
                  <div className="admin-actions">
                    <button
                      className="btn btn-warning btn-sm admin-icon-btn"
                      onClick={() => handleEditClick(item)}
                      aria-label={`Edit ${item.Name}`}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="btn btn-danger btn-sm admin-icon-btn"
                      onClick={() => deleteProduct(item.Name)}
                      aria-label={`Delete ${item.Name}`}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProducts;
