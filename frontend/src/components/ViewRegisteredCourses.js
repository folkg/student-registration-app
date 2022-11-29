import React, { useContext } from "react";
import { StudentAPIContext } from "../contexts/student-api-provider";
import { Container, Typography } from "@mui/material/";
import DisplayCourses from "./DisplayCourses";

function ViewRegisteredCourses() {
  const { studentCourses, studentInfo } = useContext(StudentAPIContext);

  const courseList = studentCourses.map((sc) => sc.theCourse);

  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{ mb: "1rem" }}
      >
        View Registered Courses for {studentInfo.firstName}{" "}
        {studentInfo.lastName}
      </Typography>
      <Typography align="center" sx={{ mb: "1rem" }}>
        Currently registered for {courseList.length} courses. Students may
        register for maximum 6 courses.
      </Typography>
      <DisplayCourses courses={courseList} />
    </Container>
  );
}

export default ViewRegisteredCourses;