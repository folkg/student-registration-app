package com.srsapi.model;

import java.util.ArrayList;

public class Student {

    private String firstName;
    private String lastName;
    private String email;
    private String uuid;
    private String password;

    private ArrayList<Registration> courseList;

    public Student() {
        courseList = new ArrayList<>();
    }

    public Student(String firstName, String lastName, String email, String uuid, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.uuid = uuid;
        this.password = password;
        courseList = new ArrayList<>();
    }

    public void addCourse(Registration r) {
        courseList.add(r);
    }

    public void removeCourse(Registration r) {
        courseList.remove(r);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String name) {
        this.firstName = name;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String id) {
        this.uuid = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastName() {

        return lastName;
    }

    public void setLastName(String lastName) {

        this.lastName = lastName;
    }

    public String getId() {
        return uuid;

    }

    public void setId(String id) {
        this.uuid = id;
    }

    public ArrayList<Registration> getCourseList() {
        return courseList;
    }

    public void setCourseList(ArrayList<Registration> courseList) {
        this.courseList = courseList;
    }

    public Registration registerForCourse(CourseCat cat, String courseName, String courseCode, int secNumber) {

        Course myCourse = cat.searchCat(courseName, courseCode);

        if (myCourse == null) {
            System.out.println("Course not found");
            throw new RuntimeException("Course not found");
        }

        if (courseList.size() >= 6) {

            System.out.println("You have already registered for 6 courses");
            throw new RuntimeException("You have already registered for 6 courses");
        }
        for (Registration r : courseList) {
            if (r.getTheCourse().equals(myCourse)) {
                System.out.println("You are already registered for this course");
                throw new RuntimeException("You are already registered for this course");
            }
        }
        // check if the student has the pre-reqs
        if (myCourse.getPreReqs().size() > 0) {
            for (Course c : myCourse.getPreReqs()) {
                boolean found = false;
                for (Registration r : courseList) {
                    if (r.getTheCourse().equals(c)) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    throw new RuntimeException("You don't have the pre-reqs for this course, you need to take "
                            + c.getCourseName() + " " + c.getCourseCode());

                 
                }
            }
        }

        Offering myOffering = myCourse.searchOffering(secNumber);
        if (myOffering == null) {
            throw new RuntimeException("Section not found");
        }

        Registration myRegistration = new Registration();
        myRegistration.register(this, myOffering);
        myOffering.addStudent(myRegistration);


        return myRegistration;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + firstName + '\'' +
                ", id=" + uuid +
                ", courseList=" + courseList +
                '}';
    }

    public String dropCourse(CourseCat cat, String courseName, String courseCode, int i) {
        Course myCourse = cat.searchCat(courseName, courseCode);
        if (myCourse == null) {
            System.out.println("Course not found");
            return "Course not found";
        }
        Offering theOffering = myCourse.getOffering(i);
        if (theOffering == null) {
            System.out.println("Section not found");
            return "Section not found";
        }

        for (Registration r : courseList) {
            if (r.getTheCourse().equals(myCourse)) {
                r.drop(this, theOffering);
                System.out.println("Course dropped");
                return null;
            }
        }
        System.out.println("You are not registered for this course");
        return "You are not registered for this course";

    }

    public String getPassword() {
        return password;
    }

}
