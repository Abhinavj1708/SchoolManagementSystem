import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewTeacher = () => {
  const history = useNavigate();
  const [teachers, setTeachers] = useState([]);

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
    fetchTeachers();
  }, [history]);


  const fetchTeachers = async () => {
    try {
      const response = await axios.post("http://localhost:5000/viewTeacher");
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (teacherId) => {
    const confirmed = window.confirm("Press OK to delete the record?");
    if (confirmed) {
      try {
        const response = await fetch("http://localhost:5000/deleteRecord", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ teacherId }),
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        fetchTeachers();
      } catch (error) {
        console.log("Error deleting record:", error);
      }
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
      <h1 style={{ padding: "20px", textAlign: "center" }}>Teacher Records</h1>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="card mt-5">
            <div className="card-body">
              <table className="table table-striped" style={{ color: "white" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Qualification</th>
                    <th>Salary</th>
                    <th>Delete?</th>
                    <th>Modify</th>
                  </tr>
                </thead>
                <tbody style={{ color: "white" }}>
                  {teachers &&
                    teachers.map((teacher) => (
                      <tr key={teacher._id}>
                        <td style={{ color: "white" }}>{teacher.Name}</td>
                        <td style={{ color: "white" }}>{teacher.Age}</td>
                        <td style={{ color: "white" }}>{teacher.Address}</td>
                        <td style={{ color: "white" }}>{teacher.Mail}</td>
                        <td style={{ color: "white" }}>{teacher.PhoneNo}</td>
                        <td style={{ color: "white" }}>
                          {teacher.qualification}
                        </td>
                        <td style={{ color: "white" }}>{teacher.salary}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteRecord(teacher._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link
                            to={"/../modifyTeacher/" + teacher._id}
                            key={teacher._id}
                          >
                            <button className="btn btn-warning">Modify</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <br></br>

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

export default ViewTeacher;
