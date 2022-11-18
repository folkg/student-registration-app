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
  return body.status === "success";
}

export default function Signup() {
  // keep track of field states
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // use a state to keep track of whether or not there is an error with signup
  const [signupError, setSignupError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });
    // set signup error status
    setSignupError(!result);
  }

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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          {signupError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Registratin was unsuccessful. Please re-try.
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Link href="/login" underline="hover">
          {"Or Log In"}
        </Link>
      </Box>
    </Container>
  );
}
