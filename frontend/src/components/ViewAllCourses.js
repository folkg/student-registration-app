import React, { useContext } from "react";
import { StudentAPIContext } from "../contexts/student-api-provider";
import { Container, Typography } from "@mui/material/";
import DisplayCourses from "./DisplayCourses";

function ViewAllCourses() {
  const { getAllCourses } = useContext(StudentAPIContext);
  const courses = getAllCourses();
  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        View All Courses
      </Typography>
      <DisplayCourses courses={courses} />
    </Container>
  );
}

export default ViewAllCourses;
