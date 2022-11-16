import React, { useState } from "react";
import "./Login.css";

async function loginUser(credentials) {
  // TODO: Modify to verify credentials with our server
  // Send credentials to server and return the token from the response
  // const response = await fetch("http://localhost:8080/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(credentials),
  // });
  // return response.json();

  //tempory measure to allow login with any credentials
  return "fake_token";
}

export default function Login(props) {
  // import the setToken function passed in with props
  const setToken = props.setToken;
  // keep track of username and password state
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={username || ""}
            onChange={(e) => setUserName(e.target.value)}
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
      </form>
    </div>
  );
}
