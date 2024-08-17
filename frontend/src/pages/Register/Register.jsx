import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Register = ({handleLogout}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:5000/signup', userData);

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        // Başarılı kayıt sonrası alanları temizle
        setEmail("");
        setUsername("");
        setPassword("");
        handleLogout();
        navigate("/login");
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Hata durumunu ele alabilirsiniz
    }
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-area">
          <h2>Register</h2>
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
              <label htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
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
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
