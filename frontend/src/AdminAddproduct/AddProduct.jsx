import React, { useState} from "react";
import axios from "axios";
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
        "http://localhost:4000/api/admin/addproduct",
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
    <div
      style={{
        margin: "50px auto",
        padding: "100px",
      }}
    >
      {errorMsg && <div className="alert alert-info">{errorMsg}</div>}
      <form onSubmit={handleSubmitproduct}>
        <div className="form-group">
          <label htmlFor="image">Upload Product Image</label>
          <div className="mb-3">
            <label htmlFor="image" className="d-block">
              <img
                src={image ? URL.createObjectURL(image) : "/Placeholder.jpg"}
                alt="img upload"
                className="img-thumbnail"
                style={{ cursor: "pointer", width: "150px", height: "150px" }}
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              className="form-control-file d-none"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
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
        <div className="form-group">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            rows="6"
            placeholder="Write Product description here..."
            className="form-control"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="category">Product Category</label>
            <select
              id="category"
              name="category"
              className="form-control"
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
          <div className="form-group col-md-6">
            <label htmlFor="quantity">Product Quantity</label>
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
          <div className="form-group col-md-6">
            <label htmlFor="price">Product Price</label>
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
        <div className="form-group col-md-6"></div>
        <button type="submit" className="btn btn-primary my-3 w-25">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
