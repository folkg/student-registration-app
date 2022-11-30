import React from "react";
import { Container, Box, Paper, Typography } from "@mui/material/";

import CourseCard from "./CourseCard";

function DisplayCourses(props) {
  const { courses, loading } = props;
  // const courses = props.courses;
  // const loading = props.loading;
  return (
    <Container
      sx={{
        maxWidth: "md",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
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
            <React.Fragment key={c.uuid}>
              <CourseCard course={c} />
            </React.Fragment>
          ))
        )}
      </Box>
    </Container>
  );
}

// Set default props
DisplayCourses.defaultProps = {
  loading: false,
};

export default DisplayCourses;
