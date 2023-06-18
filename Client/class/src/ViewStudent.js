import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewStudent = () => {
  const history = useNavigate();
  const [students, setStudents] = useState([]);
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
    fetchStudents();
  }, [history]);

  const fetchStudents = async () => {
    try {
      const response = await axios.post("http://localhost:5000/viewStudent");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
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
      <h1 style={{ padding: "20px", textAlign: "center" }}>Student Records</h1>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card mt-5">
            <div className="card-body">
              <table className="table table-striped" style={{ color: "white" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Roll No</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody style={{ color: "white" }}>
                  {students.map((student) => (
                    <tr key={student.studentID}>
                      <td style={{ color: "white" }}>{student.Name}</td>
                      <td style={{ color: "white" }}>{student.FatherName}</td>
                      <td style={{ color: "white" }}>{student.RollNo}</td>
                      <td style={{ color: "white" }}>{student.Address}</td>
                      <td style={{ color: "white" }}>{student.Mail}</td>
                      <td style={{ color: "white" }}>{student.PhoneNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
  );
};

export default ViewStudent;
