import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; // Use useLocation for route change detection
import './App.css';
import NavScrollExample from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';
import ContactUs from './Contactus/Contactus.jsx';
import AboutUs from './AboutUs/AboutUs.jsx';
import ProductsPage from './Products/ProductsPage.jsx';
import UsedScrap from './UsedScrap/UsedScrap.jsx';
import CheckoutPage from './Checkout/CheckoutPage.jsx';
import OrderConfirmation from './OrderConfirmation/OrderConfirmation.jsx';

// import Notification from './components/Notification/Notification.jsx';
import Home from './Home/Home.jsx';
import ProductDescription from './ProductDescription/ProductDescription.jsx';
import AddProduct from './AdminAddproduct/AddProduct.jsx';
import ListProducts from './ListProductsAdmin/ListProducts.jsx';
import UpdateProduct from './UpdateProductsAdmin/UpdateProducts.jsx';
import UsersShow from './UsersShowAdmin/UsersShow.jsx';
import ShowMsgs from './ShowMsgs/ShowMsgs.jsx';
import ViewOrders from './ViewOrdersAdmin/ViewOrders.jsx';
import ViewOrderDetailsAdmin from './ViewOrderDetailsAdmin/ViewOrderDetailsAdmin.jsx';
import Sidebar from './components/SidbarHomeAdmin/Sidebar.jsx';
import Loader from './components/Loader/Loader.jsx'; // Your loader component


import { useSelector } from "react-redux";

// import axios from 'axios';
// import {useTokenRefresh} from './hooks/useTokenRefresh';


function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Use location to detect route changes
    const { isAuthenticated, user } = useSelector((state) => state.auth);
  // Set up a loader when location changes
  useEffect(() => {
    setLoading(true); // Show loader when route changes
    const timer = setTimeout(() => {
      setLoading(false); // Hide loader after 1 second (adjust as needed)
    }, 1000);

    return () => clearTimeout(timer); // Clean up timer on component unmount or location change
  }, [location]); // Dependency array to trigger on location change

  // useEffect(() => {
  //   // Set Axios default Authorization header
  //   if (accessToken) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // }, [accessToken]);

  // Use the token refresh hook
  // useTokenRefresh(accessToken, setAccessToken);

  return (
    <>
    {isAuthenticated && user.role === 'admin' 
    ?<>
      {loading? <Loader />:
      <>
      <NavScrollExample />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/showmsgs" element={<ShowMsgs />} />
        <Route path="/ViewOrdersAdmin" element={<ViewOrders />} />
        <Route path="/ViewOrderDetailsAdmin/:Oid" element={<ViewOrderDetailsAdmin />} />
        <Route path="/listproducts" element={<ListProducts />} />
        <Route path="/updateproduct/:productName" element={<UpdateProduct />} />
        <Route path="/usersShow" element={<UsersShow />} />
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
      </Routes>
      <Footer />
      </>
  }
      
  </>
  :<>
 {loading? <Loader />:
      <>
      <NavScrollExample />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/usedscrap" element={<UsedScrap />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/product/:id" element={<ProductDescription />} />
        {/* <Route path="/Notification" element={<Notification />} /> */}
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/showmsgs" element={<ShowMsgs />} />
        <Route path ="/productdescription/:ProductId" element={<ProductDescription />} />
        <Route path="/listproducts" element={<ListProducts />} />
        <Route path="/updateproduct/:productName" element={<UpdateProduct />} />
        <Route path="/usersShow" element={<UsersShow />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
      <Footer />
      </>
  }
  </>}
  </>
  );
}

export default App;
