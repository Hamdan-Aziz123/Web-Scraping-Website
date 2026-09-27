import React, { useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../config/api";
import "./AddProduct.css";
const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState(null);

  const cloudinaryConfig = {
    cloudName: "dxdp6vsnp",
    uploadPreset: "pluckabook",
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      );
      console.log("Cloudinary Response:", response.data);
      console.log("Image URL:", response.data.secure_url);
      productadd(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const productadd = async (imageUrl) => {
    console.log(
      "addproduct",
      title,
      price,
      category,
      description,
      Quantity,
      imageUrl
    );
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/addproduct`,
        {
          title: title,
          price: price,
          category: category,
          description: description,
          image: imageUrl,
          Quantity: Quantity,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setErrorMsg("product added successfully");
      } else {
        setErrorMsg("product addition failed");
      }
    } catch (err) {
      setErrorMsg(err.response?.data || err.message);
    }
  };

  const handleSubmitproduct = async (e) => {
    e.preventDefault();
    handleImageUpload();
    window.scrollTo(0, 0);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2 className="admin-page__title">Add Product</h2>
          <p className="admin-page__subtitle">
            New products appear on the Products or Used Items page based on their category.
          </p>
        </div>
      </div>
      {errorMsg && <div className="alert alert-info">{errorMsg}</div>}
      <form onSubmit={handleSubmitproduct} className="admin-card add-product-form">
        <div className="add-product-form__media">
          <span className="form-label d-block">Upload Product Image</span>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            className="visually-hidden"
          />
          <label htmlFor="image" className="image-upload">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="img upload"
                className="image-upload__preview"
              />
            ) : (
              <span className="image-upload__empty">
                <FontAwesomeIcon icon={faCloudArrowUp} className="image-upload__icon" />
                <span className="image-upload__text">Click to choose an image</span>
                <span className="image-upload__hint">JPG or PNG</span>
              </span>
            )}
          </label>
        </div>

        <div className="add-product-form__fields">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Product Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Product Title"
              className="form-control"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Product Description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder="Write Product description here..."
              className="form-control"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="category" className="form-label">Product Category</label>
              <select
                id="category"
                name="category"
                className="form-select"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="category">Category</option>
                <option value="Used Scrap">Used Scrap</option>
                <option value="Plastics">Plastics</option>
                <option value="Metals">Metals</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="quantity" className="form-label">Product Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                className="form-control"
                min={1}
                required
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="price" className="form-label">Product Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="AED"
                className="form-control"
                min={1}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="add-product-form__footer">
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
