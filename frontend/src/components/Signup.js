import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

async function registerUser(userDetails) {
  // TODO: Modify to verify credentials with our server
  // Send credentials to server and return the token from the response
  const response = await fetch("http://10.13.179.216:8080/student/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  const body = JSON.parse(response.body);
  return body.status === "success" ? body.data : null;
}

export default function Signup() {
  // keep track of field states
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });
    //TODO: Display success or error message
  }

  return (
    <div className="signup-wrapper">
      <h1>Please Provide Registration Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input
            type="text"
            value={firstName || ""}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            type="text"
            value={lastName || ""}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="text"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
}
