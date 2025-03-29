import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateProducts.css';

const EditingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { productName } = useParams();
  const [oldProductName, setOldProductName] = useState(productName);
  const [formData, setFormData] = useState({
    Name: '',
    PricePerKg: '',
    Category: '',
    Description: '',
    QuantityInStock: ''
  });

  useEffect(() => {
    console.log('productName', productName);
    try {
      fetch(`http://localhost:4000/api/admin/EditedProductFetch/${productName}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data[0]);
          console.log('data in editedproductfetch', data[0]);
          setOldProductName(data[0].Name);
        });
    } catch (err) {
      console.log('error in editing page in admin', err);
    }
  }, [productName]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log('formData', formData);
    e.preventDefault();
    axios.put('http://localhost:4000/api/admin/updateProduct', { formData, oldProductName })
      .then((res) => {
        alert('Product updated successfully!');
        navigate('/listproducts');
      })
      .catch((err) => {
        console.log('error in editing page in admin', err);
        alert('Error updating product. Please try again later.');
      });
  };

  return (
    <div className="container mt-5 my-5">
      <h2 className="mb-4">Edit Product Details</h2>
      <div className="card p-4 mb-4">
        <div className="card-body">
          <h5 className="card-title">Product Details</h5>
          <p className="card-text"><strong>Title:</strong> {formData.Name}</p>
          <p className="card-text"><strong>Price:</strong>  {formData.PricePerKg}/-</p>
          <p className="card-text"><strong>Category:</strong> {formData.Category}</p>
          <p className="card-text"><strong>Description:</strong> {formData.Description}</p>
          <p className="card-text"><strong>Stock Quantity:</strong> {formData.QuantityInStock}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="Title"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="Price"
            name="PricePerKg"
            value={formData.PricePerKg}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="StockQuantity" className="form-label">Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            id="StockQuantity"
            name="QuantityInStock"
            value={formData.QuantityInStock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditingPage;
