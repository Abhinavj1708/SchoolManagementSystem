import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const history = useNavigate();

  useEffect(() => {
    const v = async () => {
      const res = await fetch("http://localhost:5000/check", {
        mode: "cors",
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === "invalid") {
        history("/");
      }
    };
    v();
  });
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout");
      const data = response.data;
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
      <h1>Welcome OnBoard</h1>
    </div>
  );
};

export default Home;
