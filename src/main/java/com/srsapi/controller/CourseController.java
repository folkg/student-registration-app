package com.srsapi.controller;

import com.srsapi.data.IDataStore;
import com.srsapi.model.jsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("course")
@RestController
public class CourseController {

    @Autowired
    private IDataStore dataStore;

    @GetMapping(value = "/{id}")
    public jsonResponse getCourseById(@PathVariable("id") String id) {
        return dataStore.getCourse(id);
    }

    @GetMapping(value = "/")
    public jsonResponse getAllCourses() {
        return dataStore.getAllCourses();
    }

    @GetMapping(value = "/{id}/prerequisites")
    public jsonResponse getPrerequisites(@PathVariable("id") String id) {
        return dataStore.getCoursePreReqs(id);
    }

    @GetMapping(value = "/{id}/offerings")
    public jsonResponse getOfferings(@PathVariable("id") String id) {
        return dataStore.getCourseOfferings(id);
    }

    // search course
    @GetMapping(value = "/search")
    public jsonResponse searchCourse(@RequestParam("query") String query) {
        return dataStore.searchCourse(query);
    }

    /*
     * documentation query this endpoint conntroller methods
     * 
     * 1- to get all the courses
     * request type: GET request url: http://localhost:8080/course/
     * response e.g. :
     * {"status":"success","message":"courses found","data":[{"uuid":"1",
     * "courseName":"Introduction to Computer Science","courseNumber":"CS 101"
     * ,"courseDept":"Computer Science","preReqs":[],"offeringList":[]},{"uuid":"2",
     * "courseName":"Introduction to Computer Science II","courseNumber":"CS 102"
     * ,"courseDept":"Computer Science","preReqs":[],"offeringList":[]},{"uuid":"3",
     * "courseName":"Introduction to Computer Science III","courseNumber":"CS 103"
     * ,"courseDept":"Computer Science","preReqs":[],"offeringList":[]}]}
     *
     * 2- to get course by id
     * request type: GET request url: http://localhost:8080/course/1
     * response e.g. : {"status":"success","message":"course","data":{"uuid":"1",
     * "courseName":"Introduction to Computer Science","courseNumber":"CS 101"
     * ,"courseDept":"Computer Science","preReqs":[],"offeringList":[]}}
     * 
     * 3- to get course prerequisites by id
     * request type: GET request url: http://localhost:8080/course/1/prerequisites
     * response e.g. :
     * {"status":"success","message":"course prerequisites found","data":[]}
     * 
     * 4- to get course offerings by id
     * request type: GET request url: http://localhost:8080/course/1/offerings
     * response e.g. :{
     * "status": "success",
     * "message": "offerings found",
     * "data": [
     * {
     * "uuid": "1",
     * "section": 1,
     * "semester": "Fall",
     * "currentEnrollment": 3,
     * "year": 2018,
     * "theCourse": {
     * "uuid": "1",
     * "courseName": "Introduction to Computer Science",
     * "courseNumber": "CS 101",
     * "courseDept": "Computer Science",
     * "preReqs": [],
     * "offeringList": []
     * }
     * }
     * ]
     * }
     * 
     * 5- to search course
     * request type: GET request url: http://localhost:8080/course/search?query=CS
     * response e.g. :
     * {"status":"success","message":"courses found","data":[{"uuid":"1",
     * "courseName":"Introduction to Computer Science","courseNumber":"CS 101"
     * ,"courseDept":"Computer Science","preReqs":[],"offeringList":[]},{"uuid":"2",
     * "courseName":"Introduction to Computer Science II","courseNumber":"CS 102"
     * ,"courseDept":"Computer Science","preReqs":[],"offeringList":[]},{"uuid":"3",
     * "courseName":"Introduction to Computer Science III","courseNumber":"CS 103"
     * ,"courseDept":"Computer Science","preReqs":[],"offeringList":[]}]}
     */

}
