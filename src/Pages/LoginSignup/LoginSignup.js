import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Pages/AuthContext";
import forvia_logo from '../../Assets/forvia_logo.png';
import "./LoginSignup.css";

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            username,
            password,
        });
        console.log("Login successful", response.data);
        localStorage.setItem("username", username);
        login();

        const redirectPath = response.data.redirectUrl || '/';
        console.log("Redirecting to:", redirectPath);
        navigate(redirectPath);
    } catch (error) {
        console.error("Login failed", error);
        alert("Incorrect username or password" + "\n" + error);
    }
};


  return (
    <div className="background">
      <div className="login-signup-container">
        <img src={forvia_logo} alt="Forvia Logo" className="logo" />
        <div className="form-container">
          <div className="form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="forgot-password">
                If you forget your password, please see your coordinator
              </p>
              <button type="submit">Login</button>
              <p className="rights-reserved">All rights are reserved</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
