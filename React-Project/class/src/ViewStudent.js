import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewStudent = () => {
  const history = useNavigate();
  const [students, setStudents] = useState([]);
  useEffect(() => {
    // Fetch all students from the backend API
    const fetchStudents = async () => {
      try {
        const response = await axios.post("http://localhost:5000/viewStudent"); // Replace with your API endpoint
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
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

    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h1>Student Records</h1>
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
