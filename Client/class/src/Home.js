import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Classes",
      },
      grid: {
        color: "grey",
      },
      ticks: {
        color: "grey",
      },
    },
    y: {
      title: {
        display: true,
        text: "Students",
      },
      grid: {
        color: "grey",
      },
      ticks: {
        color: "grey",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Class Record",
    },
  },
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
      backgroundColor: "rgba(75,192,192,1)",
    },
  },
};

const UserData = [
  {
    class: 1,
    students: 40,
  },
  {
    class: 2,
    students: 35,
  },
  {
    class: 3,
    students: 25,
  },
  {
    class: 4,
    students: 43,
  },
  {
    class: 5,
    students: 28,
  },
];

const Home = () => {
  const history = useNavigate();
  const [classassigned, setClass] = useState([]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });

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
    fetchClass();
  }, [history]);


  const fetchClass = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/teacherInfo"
      );
      setClass(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const labels = [];
    const data = [];
    const backgroundColors = [];

    classassigned.forEach((classassign) => {
      labels.push(classassign.name);
      data.push(parseInt(classassign.classCount));
      backgroundColors.push(getRandomColor());
    });

    setChartData({
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
      labels: labels,
    });
  }, [classassigned]);

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

  const userData = {
    labels: UserData.map((data) => data.class),
    datasets: [
      {
        label: "Strength",
        data: UserData.map((data) => data.students),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#F0AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        // borderColor: 'yellow',
        borderWidth: 2,
      },
    ],
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
      <div>
        <div className="home-container">
          <h1 style={{ padding: "20px", textAlign: "center" }}>
            Welcome to Bluewings
          </h1>
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div
                  className="card text-white"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    marginBottom: "10px",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Class Record</h5>
                    <br></br>
                    <br></br>
                    <div style={{ height: "400px", width: "700px" }}>
                      <Bar data={userData} options={options} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div
                  className="card text-white"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(5px)",
                    marginBottom: "20px",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Teachers-Class Assigned</h5>
                    <div style={{ height: "450px" }}>
                      <Doughnut data={chartData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Home;
