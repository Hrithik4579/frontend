import React, { useState } from "react";
import './signup.css'; // Create and define styles here
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backend-xwb2.onrender.com/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        setMessage("Signup successful! You can now log in.");
        navigate("/login"); // Redirect to login
      } else {
        setMessage(json.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="main456">
      <Navbar />
      <div className="container1">
        <h2 className="admin fs-4 text-start">Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 my-4">
            <label htmlFor="userId" className="ftext">User ID:</label>
            <div className="inpbox2">
              <input
                type="text"
                className="form-control"
                id="userId"
                name="userId"
                value={formData.userId}
                placeholder="Enter User ID"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3 my-4">
            <label htmlFor="fullName" className="ftext">Full Name:</label>
            <div className="inpbox">
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                placeholder="Enter Full Name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3 my-4">
            <label htmlFor="email" className="ftext">Email:</label>
            <div className="inpbox">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Enter Email"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group mb-3 my-4">
            <label htmlFor="password" className="ftext">Password:</label>
            <div className="inpbox">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary my-3 mt-5 signin">
            Sign Up
          </button>
          <div className="text-center">
            <Link to="/login" className="link text-muted">Already have an account? Sign in here.</Link>
          </div>
        </form>
        {message && <p className="message text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
