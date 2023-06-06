import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
};
 
export default App;
