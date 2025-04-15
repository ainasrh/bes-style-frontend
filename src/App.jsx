import React, { createContext, useState } from "react";
import { Registration } from "./Authentication/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Authentication/Login";
import Products from "./Store/Products";
import StoreNav from "./Store/StoreNav";
import Home from "./store/Home/";
import ProductCard from "./Store/ProductCard";
import ViewProduct from "./Store/ViewProduct";
import Cart from "./Checkout files/Cart";
import Checkout from "./Checkout files/Checkout";
import CreateProducts from "./admin/CreateProducts";
import Users from "./admin/Users";
import Dashboard from "./admin/Dashboard";
import SideNav from "./admin/SideNav";
import Orders from "./admin/Orders";
import ListProducts from "./admin/ListProducts";
import WishList from "./Store/WishList";
import Footer from "./Store/footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Admin Routes */}
        <Route path="admin/" element={<SideNav />}>
          <Route index element={<Dashboard />} />
          <Route path="createproduct" element={<CreateProducts />} />
          <Route path="createproduct/:id" element={<CreateProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="nav" element={<SideNav />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<ListProducts />} />
        </Route>

        {/* store Routes  */}
        <Route element={<StoreNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>
        {/* <Route path="/footer" element={<Footer/>}/> */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;
