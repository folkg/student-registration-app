import React, { useContext } from "react";
import { DarkModeContext } from "../contexts/theme.context";
import { StudentAPIContext } from "../contexts/student-api-provider";
import { Typography, AppBar, Toolbar, IconButton } from "@mui/material/";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function NavBar() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const { studentInfo } = useContext(StudentAPIContext);
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography>
          {studentInfo
            ? "Welcome, " + studentInfo.firstName + " " + studentInfo.lastName
            : "Student Registration"}
        </Typography>
        <IconButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
