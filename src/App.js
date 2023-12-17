import "./App.css";
import { useState, useEffect } from "react";
import * as React from "react";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { useCookies } from "react-cookie";
import Inventory from "./Components/Invantory";
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";
import AddItemForm from "./AddProducts";
import CheckoutPage from "./Components/CheckoutPage";
import MyOrders from "./Components/MyOrders";
import OrderDetails from "./Components/Oderdetails";

// import Register from "./Components/Register";

function App() {
  const [userName, setUserName] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-item" element={<AddItemForm />} />
        <Route path="/inventory" element={<Inventory />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/OrderDetails/:id" element={<OrderDetails />} />

        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
