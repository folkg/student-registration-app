import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ViewCourses from "./ViewCourses";
import SearchCourses from "./SearchCourses";

function CreateRoutes() {
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
        path="/searchcourses"
        element={
          <PrivateRoute>
            <SearchCourses />
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
