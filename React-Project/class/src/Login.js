import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation using regular expressions
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&'])[^ ]{8,}$/;

    let errors = {};

    // if (!emailRegex.test(email)) {
    //   errors.email = "Please enter a valid email address";
    // }

    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit and one special character";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const formData = {
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        credentials: "include",
        body: JSON.stringify(formData)
      })

      // const response = await axios.post(
      //   "http://localhost:5000/login", formData
      // );

      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
        if (data.message === "Authentication successful") {
          history("/home");
        }
      }
      console.log("Login ");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email or Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary text-center mt-3"
                >
                  Login
                </button>
                <p className="text-center mt-3">
                  <Link to="/register">Don't have an account?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
