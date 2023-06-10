import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./RegisterTeacher.css";
import axios from "axios";

const ModifyTeacher = (props) => {
  const params = useParams();
  // const [teacherData, setData] = useState();
  const history = useNavigate();
  const [teacherData, setTeacherData] = useState({
    Name: "",
    Age: "",
    Address: "",
    Mail: "",
    PhoneNo: "",
    qualification: "",
    salary: "",
  });

  useEffect(() => {
    const v = async () => {
      const fillData = (data) => {
        setTeacherData({
          Name: data.Name,
          Age: data.Age,
          Address: data.Address,
          Mail: data.Mail,
          PhoneNo: data.PhoneNo,
          qualification: data.qualification,
          salary: data.salary,
        });
      };
      const res = await fetch("http://localhost:5000/check", {
        mode: "cors",
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === "invalid") {
        history("/");
      } else {
        const id = params.id;
        let result = await fetch("http://localhost:5000/teacher", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        });
        const data = result.json();
        fillData(data);
      }
    };
    v();
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center">Modify Teacher</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="Name"
                    defaultValue={teacherData.Name}
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
                    defaultValue={teacherData.Age}
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
                    defaultValue={teacherData.Address}
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
                    defaultValue={teacherData.Mail}
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
                    defaultValue={teacherData.PhoneNo}
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
                    defaultValue={teacherData.qualification}
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
                    defaultValue={teacherData.salary}
                    value={teacherData.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <br></br>
                <div className="d-flex justify-content-center gap-5">
                  <button type="submit" className="btn btn-primary">
                    Update
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

export default ModifyTeacher;
