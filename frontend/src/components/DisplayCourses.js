import React from "react";
import { Paper, List, Divider } from "@mui/material/";
import Course from "./Course";

function DisplayCourses(props) {
  const { courses, loading } = props;
  console.log(courses);
  return (
    <Paper
      sx={{
        padding: "1rem 2rem",
        margin: " 1.5rem auto",
        maxWidth: "sm",
        alignItems: "center",
      }}
    >
      <List>
        {loading
          ? "Loading..."
          : courses == null
          ? "No courses."
          : courses.map((c, idx) => (
              <React.Fragment key={c.id}>
                <Course course={c} />
                {idx < courses.length - 1 && <Divider />}
              </React.Fragment>
            ))}
      </List>
    </Paper>
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
