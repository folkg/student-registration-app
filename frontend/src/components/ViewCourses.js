import React from "react";
import { Container, Typography, Paper, List, Divider } from "@mui/material/";
import Course from "./Course";

function ViewCourses(props) {
  const { courses } = props;

  if (courses.length > 0) {
    return (
      <Container>
        <Typography component="h1" variant="h4" align="center">
          View Courses
        </Typography>
        <Paper
          elevation="4"
          sx={{
            padding: "1rem 2rem",
            margin: " 1.5rem auto",
            maxWidth: "sm",
            alignItems: "center",
          }}
        >
          <List>
            {courses.map((c, idx) => (
              <React.Fragment key={c.id}>
                <Course course={c} />
                {idx < courses.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    );
  } else {
    return null;
  }
}

// Set default props
ViewCourses.defaultProps = {
  registrations: [{}],
  courses: [
    {
      id: "ENSF608",
      name: "Databases",
      prereqs: [
        {
          id: "ENSF592",
          name: "Java",
          prereqs: null,
        },
        {
          id: "ENSF593",
          name: "Python",
          prereqs: null,
        },
      ],
      offerings: [
        { section: 1, year: 2022, semester: "fall" },
        { section: 2, year: 2022, semester: "fall" },
      ],
    },
    {
      id: "ENSF607",
      name: "Design",
      prereqs: [
        {
          id: "ENSF592",
          name: "Java",
          prereqs: null,
        },
        {
          id: "ENSF593",
          name: "Python",
          prereqs: null,
        },
      ],
      offerings: [
        { section: 1, year: 2022, semester: "fall" },
        { section: 2, year: 2022, semester: "fall" },
      ],
    },
    {
      id: "ENSF592",
      name: "Java",
      prereqs: null,
      offerings: [{ section: 1, year: 2022, semester: "summer" }],
    },
    {
      id: "ENSF593",
      name: "Python",
      prereqs: null,
      offerings: [{ section: 1, year: 2022, semester: "summer" }],
    },
  ],
};

export default ViewCourses;
