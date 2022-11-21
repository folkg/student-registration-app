import { useState, createContext } from "react";
import { useSessionStorageState } from "../hooks/useSessionStorageState";

// const API_URL = "http://localhost:8080/";
const API_URL = "https://gs-spring-boot-docker-iigfnkziqq-uc.a.run.app/";

export const StudentAPIContext = createContext();

export function StudentAPIProvider(props) {
  // Create a token for the user and save in session storage. Default value is null.
  const [token, setToken] = useSessionStorageState("token", null);

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

  async function getStudent(id) {
    // Send studentID to server and save student info from the response
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

  return (
    <StudentAPIContext.Provider
      value={{
        login,
      }}
    >
      {props.children}
    </StudentAPIContext.Provider>
  );
}
