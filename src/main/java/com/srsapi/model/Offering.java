package com.srsapi.model;

public class Offering {

    private String uuid;
    private int section;
    private String semester;
    private int capacity;
    private int year;
    private Course theCourse;

    

    public Offering( String uuid, int section, String semester, int year, Course theCourse) {
        this.uuid = uuid;
        this.section = section;
        this.semester = semester;
        this.year = year;
        this.theCourse = theCourse;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
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

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }


    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

   
}
