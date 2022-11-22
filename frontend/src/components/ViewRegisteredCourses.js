import React, { useContext, useState, useEffect } from "react";
import { StudentAPIContext } from "../contexts/student-api-provider";
import { Container, Typography } from "@mui/material/";
import DisplayCourses from "./DisplayCourses";

function ViewRegisteredCourses() {
  const { getStudentCourses, studentInfo } = useContext(StudentAPIContext);
  const [courseList, setCourseList] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchCourses() {
    setLoading(true);
    setCourseList(await getStudentCourses());
    setLoading(false);
  }

  // [] option will behave like depreciated componentDidMount and run only once at startup
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        View Registered Courses for {studentInfo.firstName}{" "}
        {studentInfo.lastName}
      </Typography>
      <DisplayCourses courses={courseList} loading={loading} />
    </Container>
  );
}

export default ViewRegisteredCourses;
