import CreateRoutes from "./CreateRoutes";
import { StudentAPIProvider } from "../contexts/student-api-provider";

//TODO: Do we want navbar?
//TODO: Change the name of the document in the browser bar

function App() {
  const routes = CreateRoutes();
  return <StudentAPIProvider>{routes}</StudentAPIProvider>;
}

export default App;
