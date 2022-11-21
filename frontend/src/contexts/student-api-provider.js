import { createContext } from "react";
import { useSessionStorageState } from "../hooks/useSessionStorageState";

// const API_URL = "http://localhost:8080/";
const API_URL = "https://gs-spring-boot-docker-iigfnkziqq-uc.a.run.app/";

export const StudentAPIContext = createContext();

export function StudentAPIProvider(props) {
  // Create a token and studentInfo for the user and save in session storage. Default value is null.
  const [token, setToken] = useSessionStorageState("token", null);
  const [studentInfo, setStudentInfo] = useSessionStorageState("student", null);

  async function login(email, password) {
    // Send credentials to server and save the token from the response
    try {
      const response = await fetch(API_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = JSON.parse(response.body);
      if (body.status === "success") {
        // Set the token in session storage for use in later API calls
        setToken(body.data);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  const isLoggedIn = () => {
    console.log(token);
    return token != null;
  };

  async function register(email, password, firstName, lastName) {
    // Send credentials to server and save the token from the response
    try {
      const response = await fetch(API_URL + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      const body = JSON.parse(response.body);
      return body.status === "success";
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function getStudent() {
    // Send studentID to server and save student info from the response
    try {
      const response = await fetch(API_URL + "student/" + token, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = JSON.parse(response.body);
      if (body.status === "success") {
        // Set the studentInfo in session storage for use in later API calls
        setStudentInfo(body.data);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function getLoggedInStudentInfo() {
    // Returns the information for the logged in student
    // Fetches the student info first if it isn't currently stored
    if (studentInfo === null) await getStudent();
    return studentInfo;
  }

  async function getStudentCourses() {
    //TODO: Implement function body
  }

  async function addCourse() {
    //TODO: Implement function body
  }

  async function dropCourse() {
    //TODO: Implement function body
  }

  async function getAllCourses() {
    try {
      const response = await fetch(API_URL + "course/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = JSON.parse(response.body);
      if (body.status === "success") {
        // Return the result
        return body.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async function getCourse(id) {
    try {
      const response = await fetch(API_URL + "course/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = JSON.parse(response.body);
      if (body.status === "success") {
        // Return the result
        return body.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async function getCoursePrerequisites(id) {
    //TODO: Implement function body
  }

  async function getCourseOfferings(id) {
    //TODO: Implement function body
  }

  return (
    <StudentAPIContext.Provider
      value={{
        login,
        isLoggedIn,
        register,
        getLoggedInStudentInfo,
        getStudentCourses,
        addCourse,
        dropCourse,
        getAllCourses,
        getCourse,
        getCoursePrerequisites,
        getCourseOfferings,
      }}
    >
      {props.children}
    </StudentAPIContext.Provider>
  );
}
