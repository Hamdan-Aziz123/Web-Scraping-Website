import React, { useEffect, useContext, useState } from "react";
// import './OrderConfirmation.css';
import {useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/authProvider";
import axios from "axios";

const OrderConfirmation = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [orderDetails, setOrderDetails] = useState([]);
  const [orderDetailsQunatitywala, setOrderDetailsQunatitywala] = useState([]);


  const fetchOrderofUser = async () => {
    console.log("auth.user.Email", userEmail);
    const responseee = await axios
      .post(`http://localhost:3000/api/orders/orderConfirmationOrderFetch`, {
        useremail: auth.user.Email,
      })
      .then((response) => {
        console.log(
          "response of fetchOrdersofuser  in ordersConfirmation",
          response
        );
        setOrderDetails(response.data);
      });
  };

  const fetchOrderDetails = async () => {
    const responseee = await axios
      .post(
        `http://localhost:3000/api/orders/orderConfirmationOrderDetailsFetch`,
        {
          useremail: auth.user.Email,
        }
      )
      .then((response) => {
        console.log(
          "response of fetchordr details in ordersConfirmation",
          response
        );
        setOrderDetailsQunatitywala(response.data);
        
      });
  };

  const fetchAll= async()=>{
    await fetchOrderofUser();
    await fetchOrderDetails();
    
  }

  useEffect(() => {
    console.log("auth", auth);
    if (auth.user.Email) {
      console.log("addddddddddddddddddddddd in checkout.jsx", auth.user);
      setUserEmail(auth.user.Email);
      fetchAll();
      
    }
  }, [auth.user]);



  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div id="container-orderConfirm" className="container mt-5 my-5">
      <header
        className="text-center mb-4"
        style={{
          textAlign: "center",
          marginBottom: "0.4rem",
          color: "black",
        }}
      >
        <h1>Thank you. Your order has been received.</h1>
      </header>
      <div
        className="order-details bg-light p-4 rounded"
        style={{
          backgroundColor: "#f3f3f3",
          padding: "4rem",
          borderRadius: "0.5rem",
          color: "black",
        }}
      >
        <img
          src="https://res.cloudinary.com/dxdp6vsnp/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1723057282/vttorgkzomutdr7ntqrg.jpg"
          alt="Bookstore"
          className="logo d-none"
          style={{
            width: "100px",
            height: "100px",
            display: "block",
            margin: "0 auto",
            marginBottom: "2rem",
          }}
        ></img>
        {orderDetails.length > 0 ? (
          <div className="order-info mb-3">
            <p>
              <strong>ORDER NUMBER:</strong> {orderDetails[0].Oid}
            </p>
            <p>
              <strong>DATE:</strong> {formatDate(orderDetails[0].OrderDate)}
            </p>
            <p>
              <strong>TOTAL:</strong> Rs {orderDetails[0].TotalAmount}
            </p>
            <p>
              <strong>PAYMENT METHOD:</strong> {orderDetails[0].paymentMethod}
            </p>
          </div>
        ) : (
          <p>No order details available.</p>
        )}
        {/* <p className="payment-note text-muted">Pay with cash upon delivery.</p> */}
        <table
          className="table"
          style={{
            width: "100%",
          }}
        >
          <thead
            style={{
              backgroundColor: "lightgrey",
              borrderBottom: "1px solid #000",
            }}
          >
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetailsQunatitywala.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.bookAddedToOrder} x {item.Quantity}
                </td>
                <td>Rs {item.TotalPrice}</td>
              </tr>
            ))}
          </tbody>
          {orderDetails.length > 0 && (
            <tfoot>
              <tr>
                <td>Subtotal:</td>
                <td>Rs {orderDetails[0].TotalAmount - deliveryCharges}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>Rs {deliveryCharges}</td>
              </tr>
              <tr>
                <td>Payment method:</td>
                <td>{orderDetails[0].paymentMethod}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>Rs {orderDetails[0].TotalAmount}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {showLogoutPopup && (
          <div className="logout-popup">
            <div className="logout-popup-content">
              <p>Are you sure you want to logout?</p>
              <button onClick={handleConfirmLogout} className="btn btn-danger">
                Yes, Logout
              </button>
              <button
                onClick={handleCancelLogout}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default OrderConfirmation;
