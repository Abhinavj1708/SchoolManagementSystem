import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewTeacher = () => {
  const history = useNavigate();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    v();
    fetchTeachers();
  });

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
  const fetchTeachers = async () => {
    try {
      const response = await axios.post("http://localhost:5000/viewTeacher"); // Replace with your API endpoint
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

  // const modifyRecord = async (teacherId) => {
  //   const confirmed = window.confirm("Press OK to modify the record?");
  //   if (confirmed) {
  //     try {
  //       console.log({ teacherId });
  //       const response = await fetch("http://localhost:5000/modifyRecord", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify({ teacherId }),
  //       });
  //       const data = await response.json();
  //       window.alert(data.Name);
  //       fetchTeachers();
  //     } catch (error) {
  //       console.log("Error deleting record:", error);
  //     }
  //   }
  // };

  // const modifyRecord = (teacherId) => {
  //   const selectedTeacher = teachers.find(
  //     (teacher) => teacher._id === teacherId
  //   );

  //   const confirmed = window.confirm(selectedTeacher);

  //   // Redirect to the RegisterTeacher page with the record details
  //   if (confirmed) {
  //     history({
  //       pathname: "/modifyTeacher",
  //       state: { teacher: selectedTeacher },
  //     });
  //   }
  // };

  return (
    <div className="container">
      <h1>Teacher Records</h1>
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
                          <Link to={"/../modifyTeacher/" + teacher._id} key={teacher._id}>
                            <button className="btn btn-warning">Modify</button>
                          </Link>
                        </td>
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

export default ViewTeacher;
