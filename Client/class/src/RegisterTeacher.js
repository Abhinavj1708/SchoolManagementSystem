import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterTeacher.css";
import axios from "axios";

const RegisterTeacher = () => {
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
  const [teacherData, setTeacherData] = useState({
    Name: "",
    Age: "",
    Address: "",
    Mail: "",
    PhoneNo: "",
    qualification: "",
    salary: "",
  });

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setTeacherData({
      Name: "",
      Age: "",
      Address: "",
      Mail: "",
      PhoneNo: "",
      qualification: "",
      salary: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/registerTeacher",
        teacherData
      );
      const data = response.data;
      if (response.status === 200) {
        alert(data.message);
        if (data.message === "Registered successfully") {
          history("/home");
        } else {
          setTeacherData({
            Mail: "",
          });
        }
      }
      console.log("Teacher created successfully:", response.data);
    } catch (error) {
      console.error("Failed to register teacher:", error);
    }
  };
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
              <h3 className="card-title text-center">Register Teacher</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="Name"
                    value={teacherData.Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="Age"
                    value={teacherData.Age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="Address"
                    value={teacherData.Address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="Mail"
                    value={teacherData.Mail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="PhoneNo"
                    value={teacherData.PhoneNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="qualification">Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    value={teacherData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={teacherData.salary}
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

export default RegisterTeacher;
