import React, { useEffect, useState } from "react";
import "./ListProducts.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

const ListProducts = () => {
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/productsfetch"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const deleteProduct = async (title) => {
    try {
      await axios.delete("http://localhost:4000/api/admin/deleteproduct", {
        data: { Title: title },
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };

  const handleEditClick = (Product) => {
    navigate(`/updateproduct/${Product.Name}`);
  };

  return (
    <div className="container mt-5 my-3">
      <button className="btn btn-primary mb-3" onClick={fetchProducts}>
        Fetch Products
      </button>
      <h2>All Products List</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.ImageUrl}
                    alt="product"
                    className="img-thumbnail"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{item.Name}</td>
                <td>{item.Category}</td>
                <td>AED {item.PricePerKg}/-</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(item)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(item.Name)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
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
