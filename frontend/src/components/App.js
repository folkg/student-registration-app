import CreateRoutes from "./CreateRoutes";
import { StudentAPIProvider } from "../contexts/student-api-provider";
import { DarkModeProvider } from "../contexts/theme.context";
import { Paper } from "@mui/material/";
import NavBar from "./NavBar";

//TODO: Change the name of the document in the browser bar

function App() {
  const routes = CreateRoutes();
  return (
    <DarkModeProvider>
      <StudentAPIProvider>
        <Paper
          sx={{
            padding: 0,
            margin: 0,
            height: "100%",
          }}
        >
          <NavBar />
          {routes}
        </Paper>
      </StudentAPIProvider>
    </DarkModeProvider>
  );
}

export default App;
