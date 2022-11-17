import React from "react";

function Course(props) {
  const { id, name, prereqs } = props.course;
  return (
    <div>
      <h2>{id}</h2>
      <h3>{name}</h3>
      <h4>{prereqs}</h4>
    </div>
  );
}

export default Course;
