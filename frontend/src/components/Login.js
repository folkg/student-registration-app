import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

async function loginUser(credentials) {
  // TODO: Modify to verify credentials with our server
  // Send credentials to server and return the token from the response
  // const response = await fetch("http://10.13.179.216:8080/student/Login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(credentials),
  // });
  // const body = JSON.parse(response.body);
  // return body.status === "success" ? body.data : null;

  //tempory measure to allow login with any credentials
  return "fake_token";
}

export default function Login(props) {
  // import the setToken function passed in with props
  const setToken = props.setToken;
  // keep track of email and password state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    //TODO: Display success or error message
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
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
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
