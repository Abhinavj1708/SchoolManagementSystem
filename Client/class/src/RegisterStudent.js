import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterStudent.css";
import axios from "axios";

const RegisterStudent = () => {
  const history = useNavigate();

  useEffect(() => {
    const validate = async () => {
      const res = await fetch("http://localhost:5000/check", {
        mode: "cors",
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === "invalid") {
        history("/");
      }
    };
    validate();
  }, [history]);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 200) {
        alert(data.message);
        if (data.message === "Logout successful") {
          history("/");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [formData, setFormData] = useState({
    Name: "",
    FatherName: "",
    RollNo: "",
    Address: "",
    Mail: "",
    PhoneNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      Name: "",
      FatherName: "",
      RollNo: "",
      Address: "",
      Mail: "",
      PhoneNo: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/registerStudent",
        formData
      );
      const data = response.data;
      if (response.status === 200) {
        alert(data.message);
        if (data.message === "Registered successfully") {
          history("/home");
        } else {
          setFormData({
            Mail: "",
          });
        }
      }
      console.log("Student created successfully:", response.data);
    } catch (error) {
      console.error("Failed to create student:", error);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <h3 className="navbar-brand">My School App</h3>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registerTeacher" className="nav-link">
                Register Teacher
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/viewTeacher" className="nav-link">
                View Teachers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/viewStudent" className="nav-link">
                View Students
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/registerStudent" className="nav-link">
                Register Student
              </Link>
            </li>
          </ul>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Register Student</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    className="form-control"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="FatherName" className="form-label">
                    Father's Name:
                  </label>
                  <input
                    type="text"
                    id="FatherName"
                    name="FatherName"
                    className="form-control"
                    value={formData.FatherName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="RollNo" className="form-label">
                    Roll No:
                  </label>
                  <input
                    type="text"
                    id="RollNo"
                    name="RollNo"
                    className="form-control"
                    value={formData.RollNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Address" className="form-label">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="Address"
                    name="Address"
                    className="form-control"
                    value={formData.Address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Mail" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="Mail"
                    name="Mail"
                    className="form-control"
                    value={formData.Mail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="PhoneNo" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="PhoneNo"
                    name="PhoneNo"
                    className="form-control"
                    value={formData.PhoneNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <br></br>
                <div className="d-flex justify-content-center gap-5">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
              <br></br>
              <div className="d-flex justify-content-center gap-5">
                <Link to="/home" className="btn btn-success">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
