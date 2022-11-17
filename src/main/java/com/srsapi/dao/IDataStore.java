package com.srsapi.dao;

import com.srsapi.model.Student;
import com.srsapi.model.jsonResponse;

public interface IDataStore {
    jsonResponse getStudent(String uuid);

    jsonResponse login(String username, String password);

    jsonResponse register(Student student);

    boolean checkEmail(String email);

    jsonResponse studentCourses(String uuid);

    jsonResponse addCourse(String uuid, String courseCode,int section);

    jsonResponse dropCourse(String uuid, String courseCode);

    jsonResponse getCourse(String courseCode);

    jsonResponse getAllCourses();

}
