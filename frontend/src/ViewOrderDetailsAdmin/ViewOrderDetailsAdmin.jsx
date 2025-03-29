import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewOrderDetailsAdmin = () => {
  const { Oid } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // Fetch order details
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/orderDetailsFetchAdmin/${Oid}`);
        setOrderDetails(response.data);
        console.log('response.data in fetchOrderDetails admin in showing full order', response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    // Fetch order items
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/orderItemsFetchAdmin/${Oid}`);
        setOrderItems(response.data);
        console.log('response.data in fetchOrderItems admin in showing full order', response.data);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderDetails();
    fetchOrderItems();
  }, [Oid]);

  return (
    <div className='container mt-5 my-4'>
      <h1 className='text-center mb-4'>Order Details</h1>

      <div className='card mb-4'>
        <div className='card-body'>
          <h5 className='card-title'>Order Information</h5>
          <p><strong>Order ID:</strong> {orderItems.OrderID}</p>
          <p><strong>Customer:</strong> {orderItems.FirstName} {orderItems.LastName}</p>
          <p><strong>Address:</strong> {orderItems.Address}, {orderItems.City}</p>
          <p><strong>Phone:</strong> {orderItems.PhoneNumber}</p>
          <p><strong>Order Date:</strong> {new Date(orderItems.OrderDate).toLocaleDateString()}</p>
          {/* <p><strong>Total Amount:</strong> Rs {orderItems.TotalAmount}/-</p> */}
          <p><strong>Payment Method:</strong> {orderItems.paymentMethod}</p>
          <p><strong>Special Instructions:</strong> {orderItems.instruction}</p>
        </div>
      </div>

      <h3 className='mb-4'>Order Items</h3>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Book Title</th>
            <th>Quantity</th>
            
          </tr>
        </thead>
        <tbody>
          {orderDetails.map(item => (
            <tr key={item.ItemID}>
              <td>{item.OrderID}</td>
              <td>{item.ProductName}</td>
              <td>{item.Quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrderDetailsAdmin;
