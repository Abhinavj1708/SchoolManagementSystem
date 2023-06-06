import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SIgn_img from "./SIgn_img";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Login = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();

    // const getuserArr = localStorage.getItem("logindb");
    // console.log(getuserArr);

    const { email, password } = inpval;
    if (email === "") {
      toast.error("email field is requred", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("plz enter valid email addres", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("password length greater five", {
        position: "top-center",
      });
    } else {
      console.log("data added succesfully");
      const response = await axios.post("http://localhost:8000/login", inpval);
      const data = response.data;
      if (response.status === 200) {
        alert(data.message);
      }
      if (data.message === "Login successful") {
        history("/details");
      }
    }
  };

  // }

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div
            className="left_data p-3 "
            style={{
              width: "90%",
              margin: "7% 7% 3% 3%",
              background: "black",
              opacity: "0.75",
              color: "white",
            }}
          >
            <div style={{ padding: "0% 0% 0% 10%" }}>
              <h3
                className="text-center col-lg-6"
                style={{ padding: "0% 0% 0% 25%" }}
              >
                Sign IN
              </h3>
              <Form>
                <Form.Group
                  className="mb-3 col-lg-10"
                  controlId="formBasicEmail"
                >
                  <br /> <label>Email:</label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={getdata}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-10"
                  controlId="formBasicPassword"
                >
                  <label>Password:</label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={getdata}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="col-lg-10"
                  onClick={addData}
                  style={{ background: "red" }}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
              <p className="mt-3" style={{ padding: "0% 0% 0% 15%" }}>
                Don't have an Account{" "}
                <span>
                  <NavLink to="/">Register</NavLink>
                </span>{" "}
              </p>
            </div>
          </div>
          {/* <SIgn_img /> */}
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
