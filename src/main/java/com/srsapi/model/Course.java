package com.srsapi.model;

import java.util.ArrayList;

public class Course {

    private String courseName;
    private String courseCode;
    private ArrayList<Course> preReqs;
    private ArrayList<Offering> offeringList;

    public Course(String courseName, String courseCode) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.offeringList = new ArrayList<Offering>();
        this.preReqs = new ArrayList<Course>();
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public void setPreReqs(ArrayList<Course> preReqs) {
        this.preReqs = preReqs;
    }

    public Offering getOffering(int i) {

        for (Offering o : offeringList) {
            if (o.getSection() == i)
                return o;
        }
        return null;
    }

    public void setOfferingList(ArrayList<Offering> offeringList) {
        for (Offering offering : offeringList) {
            offering.setTheCourse(this);
            this.offeringList.add(offering);
        }

    }

    public ArrayList<Course> getPreReqs() {
        return preReqs;
    }

    public ArrayList<Offering> getOfferingList() {
        return offeringList;
    }

    @Override
    public String toString() {
        return "Course Name: " + courseName + "\n " +
                "Course ID: " + courseCode + "\n";

    }

    public Offering searchOffering(int secNumber) {

        for (Offering o : offeringList) {
            if (o.getSection() == secNumber) {
                return o;
            }
        }
        return null;
    }
}
