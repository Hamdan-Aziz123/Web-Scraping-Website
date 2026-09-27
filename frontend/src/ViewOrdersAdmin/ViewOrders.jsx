import React, { useState, useEffect } from 'react';
// import './orders.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../config/api';

const ViewOrders= () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    setLoadError(false);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/OrdersFetch`, { timeout: 15000 });
      console.log(response);
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  const showOrders = () => {
    fetchOrders();
  };

  // Load the list as soon as the page opens
  useEffect(() => {
    showOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const navigate = useNavigate();

  const handleViewDETailsClick = (Oid) => {
    console.log('Oid', Oid);
    // window.location.href = 'http://localhost:3000/ViewOrderDetailsAdmin/' + Oid;
    navigate(`/ViewOrderDetailsAdmin/${Oid}`);
  };

  const filteredOrders = orders.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    const customerName = `${item.FirstName || ''} ${item.LastName || ''}`.toLowerCase();
    return String(item.OrderID).includes(term) || customerName.includes(term);
  });

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h2 className="admin-page__title">All Orders</h2>
          <p className="admin-page__subtitle">
            {orders.length > 0 ? `${filteredOrders.length} of ${orders.length} orders, newest first` : "Order requests placed by customers."}
          </p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar__search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="admin-toolbar__search-icon" />
          <input
            type="search"
            className="form-control"
            placeholder="Search by order ID or customer name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search orders by ID or customer name"
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover admin-table">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Date</th>
              <th scope="col">Customer</th>
              <th scope="col">City</th>
              <th scope="col">Phone</th>
              <th scope="col">Payment</th>
              {/* <th scope="col">Total Price</th> */}
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {(filteredOrders.length === 0 || loadError) && (
              <tr>
                <td colSpan={7} className="admin-empty">
                  {loading ? (
                    "Loading orders…"
                  ) : loadError ? (
                    <span className="admin-error">
                      Couldn’t load orders. Is the backend running?{" "}
                      <button className="btn btn-outline-primary btn-sm" onClick={() => { setLoading(true); fetchOrders(); }}>
                        Try again
                      </button>
                    </span>
                  ) : orders.length === 0 ? (
                    "No orders yet."
                  ) : (
                    "No orders match your search."
                  )}
                </td>
              </tr>
            )}
            {filteredOrders.map((item, index) => (
              <tr key={index}>
                <td className="admin-cell-strong admin-table__title" data-label="Order">#{item.OrderID}</td>
                <td data-label="Date">{formatDate(item.OrderDate)}</td>
                <td className="admin-cell-strong" data-label="Customer">{item.FirstName} {item.LastName}</td>
                <td className="admin-cell-muted" data-label="City">{item.City}</td>
                <td className="admin-cell-muted" data-label="Phone">{item.PhoneNumber}</td>
                <td data-label="Payment">{item.paymentMethod && <span className="chip chip--neutral">{item.paymentMethod}</span>}</td>
                <td className="text-end admin-table__actions"><button className='btn btn-outline-primary btn-sm' onClick={()=>handleViewDETailsClick(item.OrderID)} >View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
