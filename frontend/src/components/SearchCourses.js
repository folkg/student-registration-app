import React, { useState } from "react";
import { Container, Button, TextField, Typography, Box } from "@mui/material/";
import DisplayCourses from "./DisplayCourses";

async function search(parameters) {
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
  return null;
}

function SearchCourses() {
  const [department, setDepartment] = useState();
  const [code, setCode] = useState();
  const [searchResults, setSearchResults] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const results = await search({
      department,
      code,
    });
    setSearchResults(results);
  }

  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        Search for Courses
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ ml: 1, mr: 1 }}
            margin="normal"
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <TextField
            sx={{ ml: 1, mr: 1 }}
            margin="normal"
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ ml: 1, mr: 1, mt: 3, mb: 2 }}
          >
            Search
          </Button>
        </form>
        <DisplayCourses courses={searchResults} />
      </Box>
    </Container>
  );
}

export default SearchCourses;
