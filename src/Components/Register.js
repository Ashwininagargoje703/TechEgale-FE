import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleIcon from "@mui/icons-material/Google";
import { api_url } from "../Api/api";

const Register = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const [userType, setUserType] = useState("Customer");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        phoneNumber: usernameOrEmail,
        password,
        name,
        address,
        userType,
      };
      console.log("user data", data);
      let userData = await axios.post(`${api_url}/admin/register`, data);

      if (!userData.data.err) {
        toast.success("Registration Successful!", {
          autoClose: 3000,
          onClose: () => {
            setCookie("userType", userType); // Set userType in cookies upon successful registration
            navigate("/login");
          },
        });
      } else {
        toast.error("Registration Failed. Please try again.", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <div
        style={{
          height: 100,
          marginBottom: 10,
        }}
      >
        <img
          src="https://res.cloudinary.com/zoominfo-com/image/upload/w_140,h_140,c_fit/techeagle.in"
          alt="Tech Eagle"
        />
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Email or phone number"
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <ToggleButtonGroup
          value={userType}
          exclusive
          onChange={(event, newValue) => setUserType(newValue)}
        >
          <ToggleButton
            value="Customer"
            style={
              userType === "Customer"
                ? { backgroundColor: "blue", color: "white" }
                : {}
            }
            sx={{
              textTransform: "none",
              height: 25,
            }}
          >
            Customer
          </ToggleButton>
          <ToggleButton
            value="manager"
            style={
              userType === "manager"
                ? { backgroundColor: "blue", color: "white" }
                : {}
            }
            sx={{
              textTransform: "none",
              height: 25,
            }}
          >
            Manager
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="button-container">
          <button type="submit" className="primary-button">
            Register
          </button>
          <a href="#" className="secondary-button">
            Forgot password?
          </a>
        </div>
      </form>
      <div className="social-login">
        <button className="social-button">
          <i className="fab fa-facebook-f"></i>
          Facebook
        </button>
        <button className="social-button">
          <i className="fab fa-twitter"></i>
          Twitter
        </button>
        <button className="social-button">
          <i className="fab fa-google"></i>
          Google
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
