import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewStudent from "./ViewStudent";
import RegisterStudent from "./RegisterStudent";
import ViewTeacher from "./ViewTeacher";
import RegisterTeacher from "./RegisterTeacher";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import ModifyTeacher from "./ModifyTeacher";

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/" exact element={<Home />} /> */}
        <Route path="/registerStudent" element={<RegisterStudent />} />
        <Route path="/registerTeacher" element={<RegisterTeacher />} />
        <Route path="/viewStudent" element={<ViewStudent />} />
        <Route path="/viewTeacher" element={<ViewTeacher />} />
        <Route path="/modifyTeacher/:id" element={<ModifyTeacher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
