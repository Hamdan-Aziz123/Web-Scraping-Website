import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../config/api';
import './UpdateProducts.css';

// Same Cloudinary account/preset as the Add Product page
const cloudinaryConfig = {
  cloudName: 'dxdp6vsnp',
  uploadPreset: 'pluckabook',
};

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
    QuantityInStock: '',
    ImageUrl: ''
  });
  // 'loading' | 'ready' | 'notfound' | 'error'
  const [status, setStatus] = useState('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const [newImage, setNewImage] = useState(null); // file picked to replace the current image
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Local preview for a newly picked image (released when it changes)
  const newImagePreview = useMemo(
    () => (newImage ? URL.createObjectURL(newImage) : null),
    [newImage]
  );
  useEffect(() => {
    return () => {
      if (newImagePreview) URL.revokeObjectURL(newImagePreview);
    };
  }, [newImagePreview]);

  useEffect(() => {
    let cancelled = false; // ignore a late response if the user already left the page
    setStatus('loading');
    setNewImage(null);
    // encodeURIComponent: product names with spaces, "/", "#", "?" or apostrophes work
    axios
      .get(`${API_BASE_URL}/api/admin/EditedProductFetch/${encodeURIComponent(productName)}`, { timeout: 15000 })
      .then((res) => {
        if (cancelled) return;
        const product = Array.isArray(res.data) ? res.data[0] : null;
        if (!product) {
          setStatus('notfound');
          return;
        }
        setFormData(product);
        setOldProductName(product.Name);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        console.log('error in editing page in admin', err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [productName, reloadKey]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', cloudinaryConfig.uploadPreset);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      data
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSaving(true);

    // Upload the new image first (if one was picked); otherwise keep the current one
    let imageUrl = formData.ImageUrl;
    if (newImage) {
      try {
        imageUrl = await uploadImage(newImage);
      } catch (err) {
        console.log('error uploading image in editing page in admin', err);
        setErrorMsg('Image upload failed. Please try again or keep the current image.');
        window.scrollTo(0, 0);
        setSaving(false);
        return;
      }
    }

    axios.put(`${API_BASE_URL}/api/admin/updateProduct`, {
      formData: { ...formData, ImageUrl: imageUrl },
      oldProductName,
    }, { timeout: 15000 })
      .then((res) => {
        setSuccessMsg('Product updated successfully!');
        window.scrollTo(0, 0);
        // Give the user a moment to see the confirmation before leaving the page.
        setTimeout(() => navigate('/listproducts'), 1200);
      })
      .catch((err) => {
        console.log('error in editing page in admin', err);
        setErrorMsg('Error updating product. Please try again later.');
        window.scrollTo(0, 0);
      })
      .finally(() => setSaving(false));
  };

  if (status !== 'ready') {
    return (
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <Link to="/listproducts" className="admin-back-link">← All products</Link>
            <h2 className="admin-page__title">Edit Product Details</h2>
          </div>
        </div>
        <div className="admin-card admin-state">
          {status === 'loading' && <p className="admin-state__text">Loading product…</p>}
          {status === 'notfound' && (
            <>
              <p className="admin-state__text">
                No product named “{productName}” was found. It may have been renamed or deleted.
              </p>
              <Link to="/listproducts" className="btn btn-primary">Back to products</Link>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="admin-state__text">Couldn’t load this product. Is the backend running?</p>
              <button className="btn btn-primary" onClick={() => setReloadKey((k) => k + 1)}>
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <Link to="/listproducts" className="admin-back-link">← All products</Link>
          <h2 className="admin-page__title">Edit Product Details</h2>
          <p className="admin-page__subtitle">Changes are saved when you click “Update Product”.</p>
        </div>
      </div>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      <div className="edit-product-layout">
        <div className="admin-card edit-product-summary">
          <h5 className="admin-card__title">Product Details</h5>
          <div className="edit-product-summary__image">
            {formData.ImageUrl ? (
              <img src={formData.ImageUrl} alt={formData.Name} />
            ) : (
              <span className="edit-product-summary__noimage">No image</span>
            )}
          </div>
          <dl className="detail-grid detail-grid--stacked">
            <div><dt>Title</dt><dd>{formData.Name}</dd></div>
            <div><dt>Price</dt><dd>{formData.PricePerKg}/-</dd></div>
            <div><dt>Category</dt><dd>{formData.Category}</dd></div>
            <div><dt>Stock Quantity</dt><dd>{formData.QuantityInStock}</dd></div>
            <div className="detail-grid__wide"><dt>Description</dt><dd>{formData.Description}</dd></div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="needs-validation admin-card" noValidate>
          <div className="edit-image mb-4">
            <span className="form-label d-block">Product Image</span>
            <div className="edit-image__row">
              <input
                type="file"
                id="editImage"
                accept="image/*"
                className="visually-hidden"
                onChange={(e) => setNewImage(e.target.files[0] || null)}
              />
              <label htmlFor="editImage" className="image-upload edit-image__tile">
                {newImagePreview || formData.ImageUrl ? (
                  <>
                    <img
                      src={newImagePreview || formData.ImageUrl}
                      alt="Product"
                      className="image-upload__preview"
                    />
                    <span className="image-upload__overlay">
                      <FontAwesomeIcon icon={faCloudArrowUp} /> Click to change image
                    </span>
                  </>
                ) : (
                  <span className="image-upload__empty">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="image-upload__icon" />
                    <span className="image-upload__text">Click to choose an image</span>
                    <span className="image-upload__hint">JPG or PNG</span>
                  </span>
                )}
              </label>
              <div className="edit-image__info">
                {newImage ? (
                  <>
                    <span className="chip chip--accent">New image selected</span>
                    <p className="edit-image__filename">{newImage.name}</p>
                    <p className="edit-image__hint">It replaces the current image when you click “Update Product”.</p>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setNewImage(null);
                        document.getElementById('editImage').value = '';
                      }}
                    >
                      <FontAwesomeIcon icon={faRotateLeft} /> Undo — keep current image
                    </button>
                  </>
                ) : (
                  <>
                    <span className="chip chip--neutral">Current image</span>
                    <p className="edit-image__hint">Click the image to pick a new one. If you don’t, the current image is kept.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="Title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="Title"
              name="Name"
              value={formData.Name ?? ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="Price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="Price"
                name="PricePerKg"
                value={formData.PricePerKg ?? ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="Category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                id="Category"
                name="Category"
                value={formData.Category ?? ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="StockQuantity" className="form-label">Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                id="StockQuantity"
                name="QuantityInStock"
                value={formData.QuantityInStock ?? ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="Description"
              name="Description"
              value={formData.Description ?? ''}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="edit-product-footer">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Updating…' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditingPage;
