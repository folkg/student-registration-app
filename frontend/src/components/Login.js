import React, { useState } from "react";
import "./Login.css";

async function loginUser(credentials) {
  //TODO: Modify to verify credentials with our server
  //TODO: Use awat instead of chaining .then
  //   return fetch("http://localhost:8080/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(credentials),
  //   }).then((data) => data.json());

  //tempory measure to allow login with any credentials
  return "token123";
}

export default function Login(props) {
  //Refersh: Is it worth using a context provider here? Or not worth it?
  const setToken = props.setToken;
  //TODO: Do we want there to be state here? Or can we just pull the info on submit?
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  //TODO: Is this the best way to handle the click?
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  //TODO: Was the new (e) function the best way to handle the onChange?
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
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
