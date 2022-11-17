package com.srsapi.model;

import java.util.ArrayList;

public class Offering {

    private int section;
    private Course theCourse;
    private ArrayList<Registration> studentList;

    public void addStudent(Registration r) {
        studentList.add(r);
    }

    public void removeStudent(Registration r) {
        studentList.remove(r);
    }

    public Offering(int section) {

        this.section = section;
        studentList = new ArrayList<>();
    }

    public int getSection() {
        return section;
    }

    public void setSection(int section) {
        this.section = section;
    }

    public void setTheCourse(Course theCourse) {
        this.theCourse = theCourse;
    }

    public Course getTheCourse() {
        return theCourse;
    }

    public ArrayList<Registration> getStudentList() {
        return studentList;
    }

    public void setStudentList(ArrayList<Registration> studentList) {
        this.studentList = studentList;
    }

    @Override
    public String toString() {
        return theCourse.toString() + " Section: " + section;
    }

    public ArrayList<Registration> getStudents() {
        return studentList;
    }
}
