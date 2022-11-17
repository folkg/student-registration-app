import CreateRoutes from "./CreateRoutes";
import "./App.css";

//TODO: Do we want navbar?
//TODO: Change the name of the document in the browser bar

function App() {
  const routes = CreateRoutes();
  return (
    <div>
      <h1>App</h1>
      {routes}
    </div>
  );
}

export default App;
