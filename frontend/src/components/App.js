import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSessionStorageState } from "../hooks/useSessionStorageState";
import Login from "./Login";
import Dashboard from "./Dashboard";

//TODO: Do we want navbar?
//TODO: Change the name of the document in the browser bar

function App() {
  // Create a token for the user and save in session storage. Default value is null.
  const [token, setToken] = useSessionStorageState("token", null);

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
