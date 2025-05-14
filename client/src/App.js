import React, { useEffect } from "react";

// page แบบไม่ล็อกอิน
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Shop from "./components/pages/Shop";
import Cart from "./components/pages/Cart";

// Layout
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

// V.6
import { Routes, Route } from "react-router-dom";

// pages admin
import HomeAdmin from './components/pages/admin/Home';
import MangeAdmin from './components/pages/admin/MangeAdmin';
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCatrgory from "./components/pages/admin/category/UpdateCatrgory";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";
import Order from "./components/pages/admin/Order";

// pages user
import HomeUser from './components/pages/user/Home';
import CheckOut from "./components/pages/CheckOut";
import Payment from "./components/pages/Payment";
import WishList from "./components/pages/user/WishList";
import History from "./components/pages/user/History";

// function
import { currentUser } from "./components/functions/auth";

// redux
import { useDispatch } from 'react-redux';

// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

// react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;

  useEffect(() => {
    if (idtoken) {
      currentUser(idtoken)
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: {
              token: idtoken,
              username: res.data.username,
              role: res.data.role,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, idtoken]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ToastContainer />
      <Navbar />
      <div style={{ flex: "1" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/admin/index" element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          } />
          <Route path="/admin/mange-admin" element={
            <AdminRoute>
              <MangeAdmin />
            </AdminRoute>
          } />
          <Route path="/admin/create-category" element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          } />
          <Route path="/admin/update-category/:id" element={
            <AdminRoute>
              <UpdateCatrgory />
            </AdminRoute>
          } />
          <Route path="/admin/create-product" element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          } />
          <Route path="/admin/update-product/:id" element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <Order />
            </AdminRoute>
          } />
          <Route path="/user/index" element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          } />
          <Route path="/checkout" element={
            <UserRoute>
              <CheckOut />
            </UserRoute>
          } />
          <Route path="/payment" element={
            <UserRoute>
              <Payment />
            </UserRoute>
          } />
          <Route path="/user/wishlist" element={
            <UserRoute>
              <WishList />
            </UserRoute>
          } />
          <Route path="/user/history" element={
            <UserRoute>
              <History />
            </UserRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
