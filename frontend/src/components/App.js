import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  //TODO: store user login in browser session?
  const [token, setToken] = useState();
  console.log(token);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="wrapper">
      <h1>App</h1>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
