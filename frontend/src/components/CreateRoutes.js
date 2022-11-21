import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { StudentAPIContext } from "../contexts/student-api-provider";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ViewCourses from "./ViewCourses";
import SearchCourses from "./SearchCourses";

// check to ensure we are logged in before navigating to a private page
function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(StudentAPIContext);
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

// don't allow navigation to the certain pages if user is already authenticated
function AnonymousRoute({ children }) {
  const { isLoggedIn } = useContext(StudentAPIContext);
  return isLoggedIn() ? <Navigate to="/" /> : children;
}

function CreateRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={
          <AnonymousRoute>
            <Login />
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
