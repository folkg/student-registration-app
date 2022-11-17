package com.srsapi.model;

import java.util.ArrayList;

public class CourseCat {

    ArrayList<Course> courseList;

    public CourseCat(ArrayList<Course> courseList) {
        this.courseList = courseList;
    }

    public ArrayList<Course> getCourseList() {
        return courseList;
    }

    public Course searchCat(String courseName, String courseCode) {

        for (Course c : courseList) {
            if (c.getCourseName().equals(courseName) &&
                    c.getCourseCode() == courseCode) {
                return c;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return "CourseCat{" +
                "courseList=" + courseList +
                '}';
    }

    public Course searchCourse(String courseName, String courseNumber) {

        for (Course c : courseList) {
            if (c.getCourseName().equals(courseName) &&
                    c.getCourseCode() == courseNumber) {
                return c;
            }
        }
        return null;
    }

    public ArrayList<Course> searchCourses(String searchString) {

        // check if the search string iin the course name or course id

        ArrayList<Course> searchResult = new ArrayList<>();

        for (Course c : courseList) {
            if (c.getCourseName().toLowerCase().contains(searchString.toLowerCase()) ||
                    c.getCourseCode().contains(searchString)) {
                searchResult.add(c);
            }
        }
        return searchResult;

    }

}
