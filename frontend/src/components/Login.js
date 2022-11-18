import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Link,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

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
  // import the setToken function passed in from CreateRoutes in props
  const setToken = props.setToken;
  // keep track of email and password state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // use a state to keep track of whether or not there is an error with login
  const [loginError, setLoginError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    // set the token using the function passed in from CreateRoutes in props
    setToken(token);
    // set login error status
    if (!token) setLoginError(true);
    else setLoginError(false);
  }

  //TODO: Delete below. Keeping for now just to show what simple HTML looked like before using MUI components
  // return (
  //   <div className="login-wrapper">
  //     <h1>Please Log In</h1>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         <p>Email</p>
  //         <input
  //           type="text"
  //           value={email || ""}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //       </label>
  //       <label>
  //         <p>Password</p>
  //         <input
  //           type="password"
  //           value={password || ""}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </label>
  //       <div>
  //         <button type="submit">Submit</button>
  //       </div>
  //       <div>
  //         <Link to="/signup">Sign Up</Link>
  //       </div>
  //     </form>
  //   </div>
  // );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Email / Password entered is incorrect. Please re-try.
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </form>
        <Link href="/signup" underline="hover">
          {"Or Sign Up"}
        </Link>
      </Box>
    </Container>
  );
}
