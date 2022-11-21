import React, { useContext } from "react";
import { StudentAPIContext } from "../contexts/student-api-provider";
import { Container, Typography } from "@mui/material/";
import DisplayCourses from "./DisplayCourses";

function ViewRegisteredCourses() {
  const { getStudentCourses, getLoggedInStudentInfo } =
    useContext(StudentAPIContext);
  const { firstName, lastName, id } = getLoggedInStudentInfo();
  const courses = getStudentCourses();
  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        View Registered Courses for {firstName} {lastName} ({id})
      </Typography>
      <DisplayCourses courses={courses} />
    </Container>
  );
}

export default ViewRegisteredCourses;
