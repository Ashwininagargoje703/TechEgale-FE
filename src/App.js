import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import AddItemForm from "./AddProducts";
import CheckoutPage from "./Components/CheckoutPage";
import MyOrders from "./Components/MyOrders";
import Inventory from "./Components/Invantory";
import OrderDetails from "./Components/Oderdetails";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in using cookies or your authentication mechanism
    const isLoggedIn = cookies.isLoggedIn === "true";
    setLogin(isLoggedIn);
  }, [cookies]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        />
        {/* Protect the following routes by checking login status */}
        <Route
          path="/add-item"
          element={isLogin ? <AddItemForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/inventory"
          element={isLogin ? <Inventory /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLogin ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-orders"
          element={isLogin ? <MyOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/OrderDetails/:id"
          element={isLogin ? <OrderDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={isLogin ? <CheckoutPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
