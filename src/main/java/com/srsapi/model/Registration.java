package com.srsapi.model;

public class Registration {

    private Offering theOffering;
    private Student theStudent;

    private char theGrade;

    public void register(Student theStudent, Offering theOffering) {
        this.theStudent = theStudent;
        this.theOffering = theOffering;
        theOffering.addStudent(this);
        theStudent.addCourse(this);
    }

    public void setTheGrade(char theGrade) {
        this.theGrade = theGrade;
    }

    public char getTheGrade() {
        return theGrade;
    }

    public Offering getTheOffering() {
        return theOffering;
    }

    public Student getTheStudent() {
        return theStudent;
    }

    @Override
    public String toString() {
        return theOffering.toString();
    }

    public void drop(Student student, Offering theOffering2) {
        theOffering2.removeStudent(this);
        student.removeCourse(this);
    }

    public Course getTheCourse() {
        return theOffering.getTheCourse();
    }

}
