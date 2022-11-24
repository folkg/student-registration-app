import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Button,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StudentAPIContext } from "../contexts/student-api-provider";

export default function CourseCard(props) {
  const { getCoursePrerequisites, getCourseOfferings } =
    useContext(StudentAPIContext);
  const { regfx, dropfx } = props;
  const { uuid, courseNumber, courseName, courseDept } = props.course;
  const [preReqs, setPreReqs] = React.useState(null);
  const [offeringList, setOfferingList] = React.useState(null);

  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(false);

  //TODO: Update this to be a boolean or fx that checks uuid vs all enrolled uuids.
  const isEnrolled = true;

  useEffect(() => {
    // load data on expansion if data has not yet loaded
    if (expanded === true && (preReqs == null || offeringList == null)) {
      async function fetchCourseLists() {
        setLoading(true);
        setPreReqs(await getCoursePrerequisites(uuid));
        setOfferingList(await getCourseOfferings(uuid));
        setLoading(false);
      }

      fetchCourseLists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Card sx={{ mb: "1rem" }} elevation={2}>
      <CardContent>
        <Typography color="text.secondary">{courseDept}</Typography>
        <Typography variant="h5" component="div">
          {courseNumber} - {courseName}
        </Typography>
      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {regfx && !isEnrolled && <Button onClick={regfx}>Register</Button>}
        {dropfx && isEnrolled && <Button onClick={dropfx}>Drop</Button>}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider sx={{ mb: "0.5rem" }} />
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <Typography color="text.secondary">Offerings:</Typography>
              <List>
                {offeringList == null || offeringList.length === 0 ? (
                  <Typography color="text.secondary">None</Typography>
                ) : (
                  offeringList.map((o) => (
                    <ListItem key={o.id}>
                      <Typography color="text.secondary">
                        Section {o.section} - {o.semester} {o.year} (
                        {o.currentEnrollment} students currently enrolled)
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
              </List>{" "}
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
