import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const ViewOrderDetailsAdmin = () => {
  const { Oid } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  // 'loading' | 'ready' | 'notfound' | 'error'
  const [status, setStatus] = useState('loading');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // Fetch order details
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/orderDetailsFetchAdmin/${encodeURIComponent(Oid)}`, { timeout: 15000 });
        setOrderDetails(Array.isArray(response.data) ? response.data : []);
        console.log('response.data in fetchOrderDetails admin in showing full order', response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    // Fetch order items
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/orderItemsFetchAdmin/${encodeURIComponent(Oid)}`, { timeout: 15000 });
        if (!response.data || typeof response.data !== 'object') {
          setStatus('notfound');
          return;
        }
        setOrderItems(response.data);
        setStatus('ready');
        console.log('response.data in fetchOrderItems admin in showing full order', response.data);
      } catch (error) {
        console.error('Error fetching order items:', error);
        setStatus(error.response?.status === 404 ? 'notfound' : 'error');
      }
    };

    setStatus('loading');
    fetchOrderDetails();
    fetchOrderItems();
  }, [Oid, reloadKey]);

  if (status !== 'ready') {
    return (
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <Link to="/ViewOrdersAdmin" className="admin-back-link">← All orders</Link>
            <h1 className="admin-page__title">Order Details</h1>
          </div>
        </div>
        <div className="admin-card admin-state">
          {status === 'loading' && <p className="admin-state__text">Loading order…</p>}
          {status === 'notfound' && (
            <>
              <p className="admin-state__text">Order #{Oid} was not found.</p>
              <Link to="/ViewOrdersAdmin" className="btn btn-primary">Back to orders</Link>
            </>
          )}
          {status === 'error' && (
            <>
              <p className="admin-state__text">Couldn’t load this order. Is the backend running?</p>
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
          <Link to="/ViewOrdersAdmin" className="admin-back-link">← All orders</Link>
          <h1 className="admin-page__title">Order Details</h1>
          <p className="admin-page__subtitle">Order #{orderItems.OrderID}</p>
        </div>
      </div>

      <div className="admin-card">
        <h5 className="admin-card__title">Order Information</h5>
        <dl className="detail-grid">
          <div><dt>Order ID</dt><dd>{orderItems.OrderID}</dd></div>
          <div><dt>Customer</dt><dd>{orderItems.FirstName} {orderItems.LastName}</dd></div>
          <div><dt>Phone</dt><dd>{orderItems.PhoneNumber}</dd></div>
          <div><dt>Email</dt><dd>{orderItems.Email}</dd></div>
          <div><dt>Order Date</dt><dd>{new Date(orderItems.OrderDate).toLocaleDateString()}</dd></div>
          {/* <div><dt>Total Amount</dt><dd>Rs {orderItems.TotalAmount}/-</dd></div> */}
          <div><dt>Payment Method</dt><dd>{orderItems.paymentMethod}</dd></div>
          <div className="detail-grid__wide"><dt>Address</dt><dd>{orderItems.Address}, {orderItems.City}</dd></div>
          <div className="detail-grid__wide"><dt>Special Instructions</dt><dd>{orderItems.instruction || "—"}</dd></div>
        </dl>
      </div>

      <div className="admin-card admin-card--flush">
        <h3 className="admin-card__title">Order Items</h3>
        <div className="table-responsive">
          <table className="table table-hover admin-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map(item => (
                <tr key={item.ItemID}>
                  <td className="admin-cell-muted" data-label="Item ID">{item.OrderID}</td>
                  <td className="admin-cell-strong admin-table__title" data-label="Product">{item.ProductName}</td>
                  <td data-label="Quantity">{item.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetailsAdmin;
