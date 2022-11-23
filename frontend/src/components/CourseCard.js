import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  List,
  ListItem,
} from "@mui/material";

export default function CourseCard(props) {
  const {
    courseNumber,
    courseName,
    courseDept,
    preReqs,
    offeringList,
    regfx,
    dropfx,
  } = props.course;

  return (
    <Card sx={{ mb: "1rem" }} elevation={2}>
      <CardContent>
        <Typography color="text.secondary">{courseDept}</Typography>
        <Typography variant="h5" component="div" sx={{ mb: "1rem" }}>
          {courseNumber} - {courseName}
        </Typography>
        <Typography color="text.secondary">Offerings:</Typography>
        <List>
          {offeringList == null || offeringList.length === 0 ? (
            <Typography color="text.secondary">None</Typography>
          ) : (
            offeringList.map((o) => (
              <ListItem key={o.id}>
                <Typography color="text.secondary">
                  Section {o.section} - {o.semester} {o.year} ({o.registered}{" "}
                  students registered)
                </Typography>
              </ListItem>
            ))
          )}
        </List>
        <Typography color="text.secondary">Prerequisites:</Typography>
        <List>
          {preReqs == null || preReqs.length === 0 ? (
            <Typography color="text.secondary">None</Typography>
          ) : (
            preReqs.map((p) => (
              <ListItem key={p.id}>
                <Typography color="text.secondary">
                  {p.courseNumber} - {p.courseName}
                </Typography>
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
      <CardActions>
        {regfx && <Button onClick={regfx}>Register</Button>}
        {dropfx && <Button onClick={dropfx}>Drop</Button>}
      </CardActions>
    </Card>
  );
}
