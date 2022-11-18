import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

function Course(props) {
  const { id, name, prereqs } = props.course;

  //TODO: Make MUI
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
          {id} - {name}
        </Typography>
        <Typography component="h1" variant="h6">
          Prerequisites:
        </Typography>
        <List>
          {prereqs == null
            ? "None"
            : prereqs.map((p) => (
                <ListItem key={p.id}>
                  {p.id} - {p.name}
                </ListItem>
              ))}
        </List>
      </Box>
    </ListItem>
  );
}

export default Course;
