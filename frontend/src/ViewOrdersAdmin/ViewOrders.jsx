import React, { useState } from 'react';
// import './orders.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const ViewOrders= () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/OrdersFetch');
      console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const showOrders = () => {
    console.log('showOrders function in show orders');
    fetchOrders();
  };

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

  return (
    <div className='container mt-5 my-5'>
      <div className='d-flex justify-content-center mb-4'>
        <button className='btn btn-primary' onClick={showOrders}>Show Orders</button>
      </div>
      <p className='h4 text-center mb-4'>All Orders</p>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Date</th>
              <th scope="col">Customer</th>
              {/* <th scope="col">Total Price</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index}>
                <td>{item.OrderID}</td>
                <td>{formatDate(item.OrderDate)}</td>
                <td>{item.FirstName} {item.LastName}</td>
                <td><button className='btn btn-primary' onClick={()=>handleViewDETailsClick(item.OrderID)} >View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
