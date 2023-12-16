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
          src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fassets-global.website-files.com%2F6284afcd3c8fe34dca52d136%2F62bfd7e69c25897f423bcdac_TechEagle%2520new%2520logo.svg&tbnid=8X5zH6jYfh5VpM&vet=12ahUKEwiCqZKsv4qDAxViSGwGHZnzBnUQMygCegQIARBW..i&imgrefurl=https%3A%2F%2Fwww.techeagle.in%2F&docid=gMolb03qH0j2BM&w=143&h=81&q=tech%20eagle&ved=2ahUKEwiCqZKsv4qDAxViSGwGHZnzBnUQMygCegQIARBW"
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
