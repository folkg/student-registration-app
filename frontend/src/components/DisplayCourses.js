import React from "react";
import { Container, Paper, Typography } from "@mui/material/";
import CourseCard from "./CourseCard";

function DisplayCourses(props) {
  const { courses, loading } = props;
  return (
    <Container>
      {loading ? (
        <Paper sx={{ m: "2rem", p: "1rem" }} elevation={2} align="center">
          <Typography>Loading...</Typography>
        </Paper>
      ) : courses == null ? (
        <Paper sx={{ m: "2rem", p: "1rem" }} elevation={2} align="center">
          <Typography>No courses.</Typography>
        </Paper>
      ) : (
        courses.map((c) => (
          <React.Fragment key={c.id}>
            <CourseCard course={c} />
          </React.Fragment>
        ))
      )}
    </Container>
  );
}

// Set default props
DisplayCourses.defaultProps = {
  loading: false,
  courses: [
    {
      courseNumber: "ENSF 608",
      courseName: "Databases",
      courseDept: "Software Engineering",
      preReqs: [
        {
          courseNumber: "ENSF592",
          courseName: "Java",
          courseDept: "Software Engineering",
          preReqs: [],
        },
        {
          courseNumber: "ENSF593",
          courseName: "Python",
          courseDept: "Software Engineering",
          preReqs: [],
        },
      ],
      offeringList: [
        { section: 1, year: 2022, semester: "fall" },
        { section: 2, year: 2022, semester: "fall" },
      ],
    },
    {
      courseNumber: "ENSF607",
      courseName: "Design",
      courseDept: "Software Engineering",
      preReqs: [
        {
          courseNumber: "ENSF592",
          courseName: "Java",
          courseDept: "Software Engineering",
          preReqs: [],
        },
        {
          courseNumber: "ENSF593",
          courseName: "Python",
          courseDept: "Software Engineering",
          preReqs: [],
        },
      ],
    },
    {
      courseNumber: "ENSF592",
      courseName: "Java",
      courseDept: "Software Engineering",
      preReqs: [],
      offerings: [{ section: 1, year: 2022, semester: "summer" }],
    },
    {
      courseNumber: "ENSF593",
      courseName: "Python",
      courseDept: "Software Engineering",
      preReqs: [],
      offerings: [{ section: 1, year: 2022, semester: "summer" }],
    },
  ],
};

export default DisplayCourses;
