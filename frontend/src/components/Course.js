import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

function Course(props) {
  const { courseNumber, courseName, courseDept, preReqs, offeringList } =
    props.course;

  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "text.secondary",
          p: 1,
        }}
      >
        <Typography component="h1" variant="h5" color="text.primary">
          {courseNumber} -{courseName}
        </Typography>
        <Typography component="h1" variant="h6" color="text.secondary">
          {courseDept}
        </Typography>
        <Typography component="h1" variant="h6">
          Offerings:
        </Typography>
        <List>
          {offeringList == null
            ? "None"
            : offeringList.map((o) => (
                <ListItem key={o.id}>
                  Section {o.section} - {o.semester} {o.year}
                </ListItem>
              ))}
        </List>
        <Typography component="h1" variant="h6">
          Prerequisites:
        </Typography>
        <List>
          {preReqs == null
            ? "None"
            : preReqs.map((p) => (
                <ListItem key={p.id}>
                  {p.courseNumber} - {p.courseName}
                </ListItem>
              ))}
        </List>
      </Box>
    </ListItem>
  );
}

export default Course;
