import { Routes, Route, Navigate } from "react-router-dom";
import { useSessionStorageState } from "../hooks/useSessionStorageState";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ViewCourses from "./ViewCourses";

function CreateRoutes() {
  // Create a token for the user and save in session storage. Default value is null.
  const [token, setToken] = useSessionStorageState("token", null);

  // check to ensure we are logged in before navigating to a private page
  function PrivateRoute({ children }) {
    return token ? children : <Navigate to="/login" />;
  }

  // don't allow navigation to the certain pages if user is already authenticated
  function AnonymousRoute({ children }) {
    return token ? <Navigate to="/" /> : children;
  }
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          <AnonymousRoute>
            <Login setToken={setToken} />
          </AnonymousRoute>
        }
      />
      <Route
        exact
        path="/signup"
        element={
          <AnonymousRoute>
            <Signup />
          </AnonymousRoute>
        }
      />
      <Route
        exact
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/viewcourses"
        element={
          <PrivateRoute>
            <ViewCourses />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
export default CreateRoutes;
