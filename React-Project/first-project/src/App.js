import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      setMessage(`Hello, ${name}! Welcome to the React.js application.`);
      setName('');
    } else {
      setMessage('Please enter your name.');
    }
  };

  return (
    <div className="app">
      <h1>React.js Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;