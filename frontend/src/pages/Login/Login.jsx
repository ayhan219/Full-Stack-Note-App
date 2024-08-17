import React, { useContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom"; // Buradaki hatayı düzelttim
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../UserContext";

const Login = ({ handleLogin }) => {
  const { username, setUsername } = useContext(User);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Bu satırın yerini değiştirdim, form gönderimini önlemek için ilk olarak çalışmalı

    const userData = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userData
      );

      if (response.status === 200) {
        console.log("Logged in successfully");
        // setUsername("");
        setPassword("");
        handleLogin();
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

    console.log("Username:", username);
    console.log("Password:", password);
    // Clear the fields after submission or handle errors
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-area">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>{" "}
          {/* Link bileşenini kullandım */}
        </div>
      </div>
    </div>
  );
};

export default Login;
