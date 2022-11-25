import React, { useContext, useState, useEffect } from "react";
import { StudentAPIContext } from "../contexts/student-api-provider";
import { Container, Typography } from "@mui/material/";
import DisplayCourses from "./DisplayCourses";

function ViewAllCourses() {
  const { getAllCourses } = useContext(StudentAPIContext);
  const [courseList, setCourseList] = useState(null);
  const [loading, setLoading] = useState(false);

  // [] option will behave like depreciated componentDidMount and run only once at startup
  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      setCourseList(await getAllCourses());
      setLoading(false);
    }

    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography component="h1" variant="h4" align="center">
        View All Courses
      </Typography>
      <DisplayCourses courses={courseList} loading={loading} />
    </Container>
  );
}

export default ViewAllCourses;
