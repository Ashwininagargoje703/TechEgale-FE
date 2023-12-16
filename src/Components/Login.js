import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("get hit here");
    let loginData = {
      phoneNumber: usernameOrEmail,
      password,
    };

    let userData = await axios.post(
      `https://techegle-production.up.railway.app/admin/login`,
      loginData
    );
    console.log(userData.data.data);

    if (!userData.data.err) {
      console.log("hit here only", userData.data);
      setCookie("serviceToken", userData.data.msg.token);
      setCookie("userId", userData.data.msg.userId);
      setCookie("role", userData.data.msg.role);
      setCookie("userName", userData.data.msg.phoneNumber);
      setCookie("name", userData.data.msg.name);
      setCookie("isLoggedIn", "true");
      navigate("/");
    }

    alert(userData.data.msg);
  };

  return (
    <div className="login-container">
      <div className="logo-wrapper">
        <img
          src="https://res.cloudinary.com/zoominfo-com/image/upload/w_140,h_140,c_fit/techeagle.in"
          alt="Tech Eagle"
        />
      </div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="primary-button">
            Sign in
          </button>
          <a href="/register" className="secondary-button">
            Create an account ?
          </a>
        </div>
      </form>
      <div className="social-login">
        <p>Sign in with social accounts</p>
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
    </div>
  );
};

export default Login;
