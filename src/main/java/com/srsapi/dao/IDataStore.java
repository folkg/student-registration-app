package com.srsapi.dao;

import com.srsapi.model.Student;
import com.srsapi.model.jsonResponse;

public interface IDataStore {
    jsonResponse getStudent(String uuid);

    jsonResponse login(String username, String password);

    jsonResponse register(Student student);

    boolean checkEmail(String email);

    jsonResponse getStudentCourses(String uuid);

    jsonResponse addCourse(String studentuuid, String courseuuid, int section);

    jsonResponse dropCourse(String studentuuid, String courseuuid, int section);

    jsonResponse getCourse(String courseCode);

    jsonResponse getAllCourses();

    jsonResponse getCoursePreReqs(String courseuuid);

    jsonResponse getCourseOfferings(String courseuuid);

}
