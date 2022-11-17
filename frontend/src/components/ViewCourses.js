import React from "react";
import "./ViewCourses.css";
import Course from "./Course";

function ViewCourses(props) {
  const { courses } = props;
  return (
    <div>
      <h1>ViewCourses</h1>
      <ul>
        {courses.map((c) => (
          <React.Fragment key={c.id}>
            <Course course={c} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

// Set default props
ViewCourses.defaultProps = {
  courses: [
    {
      id: "ENSF608",
      name: "Databases",
      prereqs: "None",
    },
    {
      id: "ENSF607",
      name: "Design",
      prereqs: "None",
    },
  ],
};

export default ViewCourses;
