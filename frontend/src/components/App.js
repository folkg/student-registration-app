import CreateRoutes from "./CreateRoutes";
import { StudentAPIProvider } from "../contexts/student-api-provider";
import "./App.css";

//TODO: Do we want navbar?
//TODO: Change the name of the document in the browser bar

function App() {
  const routes = CreateRoutes();
  return (
    <div className="wrapper ">
      <h1>App</h1>
      <StudentAPIProvider>{routes}</StudentAPIProvider>
    </div>
  );
}

export default App;
