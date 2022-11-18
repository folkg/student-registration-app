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
        <Paper>
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
    },
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
};

export default ViewCourses;
