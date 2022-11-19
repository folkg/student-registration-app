package com.srsapi.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.srsapi.model.*;

@Component("dataStore")
public class DataStore implements IDataStore {

    private Statement getStatement() throws SQLException, ClassNotFoundException {
        Connection conn = DriverManager.getConnection("jdbc:mysql://MYSQL6013.site4now.net/db_a39532_ensf608",
                "a39532_ensf608", "spkx9876");
        Statement stmt = conn.createStatement();
        return stmt;
    }

    private boolean checkSQLInjection(String str) {
        String regex = "((\\%27)|(\\'))((\\%6F)|o|(\\%4F))((\\%72)|r|(\\%52))";
        return str.matches(regex);

    }

    public jsonResponse getStudent(String uuid) {
        Statement stmt = null;
        java.sql.ResultSet rset = null;
        try {
            if (checkSQLInjection(uuid)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from student where uuid = '" + uuid + "'";
            rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                String firstName = rset.getString("first_name");
                String lastName = rset.getString("last_name");
                String email = rset.getString("email");
                Student student = new Student(uuid, firstName, lastName, email, "");

                return new jsonResponse("success", "student found", student);
            }

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);

        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }

            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "student not found", null);

    }

    private boolean ifExist(String email) {
        Statement stmt = null;
        try {
            if (checkSQLInjection(email)) {
                return false;
            }

            stmt = getStatement();
            String strSelect = "select * from student where email = '" + email + "'";
            java.sql.ResultSet rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                return true;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    private boolean checkPreReq(String studentId, String courseId) {
        Statement stmt = null;
        try {
            if (checkSQLInjection(studentId) || checkSQLInjection(courseId)) {
                return false;
            }

            stmt = getStatement();
            String strSelect = "select * from prerequisite where course_uuid = '" + courseId + "'";
            java.sql.ResultSet rset = stmt.executeQuery(strSelect);
            List<Boolean> regList = new ArrayList<>();
            while (rset.next()) {
                String preReqId = rset.getString("prerequisite_course_uuid");
                strSelect = "select * from registration where student_uuid = '" + studentId + "' and course_uuid = '"
                        + preReqId + "' and (status = 'registered' or status = 'completed')";
                rset = stmt.executeQuery(strSelect);
                if (rset.next()) {
                    regList.add(true);
                } else {
                    regList.add(false);
                }
            }
            if (regList.contains(false)) {
                return false;
            }
            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public jsonResponse login(String username, String password) {
        Statement stmt = null;
        java.sql.ResultSet rset = null;

        try {
            if (checkSQLInjection(username) || checkSQLInjection(password)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from student where email = '" + username + "' and password = '" + password
                    + "'";
            rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                String uuid = rset.getString("uuid");
                return new jsonResponse("success", "student found", uuid);
            }

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "student not found", null);

    }

    @Override
    public jsonResponse register(Student student) {
        Statement stmt = null;
        java.sql.ResultSet rset = null;

        try {
            if (checkSQLInjection(student.getEmail()) || checkSQLInjection(student.getPassword())) {
                return null;
            }

            if (ifExist(student.getEmail())) {
                return new jsonResponse("error", "email already exist", null);
            }

            String uuid = UUID.randomUUID().toString();
            stmt = getStatement();
            String strInsert = "insert into student (uuid, first_name, last_name, email, password) values ('"
                    + uuid + "', '" + student.getFirstName() + "', '" + student.getLastName() + "', '"
                    + student.getEmail() + "', '" + student.getPassword() + "')";
            int countInserted = stmt.executeUpdate(strInsert);
            if (countInserted == 1) {
                return new jsonResponse("success", "student registered", uuid);
            }

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "student not registered", null);
    }

    @Override
    public boolean checkEmail(String email) {

        return ifExist(email);
    }

    @Override
    public jsonResponse getStudentCourses(String uuid) {
        Statement stmt = null;
        java.sql.ResultSet rset = null;
        try {
            if (checkSQLInjection(uuid)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from registration join course on registration.course_uuid = course.uuid join offering on registration.course_uuid = offering.course_uuid and registration.section_number = offering.section_number where registration.student_uuid= '"
                    + uuid + "' and (registration.status = 'registered' or registration.status = 'completed')";

            rset = stmt.executeQuery(strSelect);
            List<Registration> courses = new ArrayList<Registration>();
            while (rset.next()) {
                String courseUuid = rset.getString("course_uuid");
                String courseName = rset.getString("name");
                String courseNumber = rset.getString("number");
                String courseDept = rset.getString("department");

                String reguuid = rset.getString("uuid");
                int sectionNumber = rset.getInt("section_number");
                String semester = rset.getString("semester");
                int year = rset.getInt("year");
                String status = rset.getString("status");
                String grade = rset.getString("grade");
                Course course = new Course(courseUuid, courseName, courseNumber, courseDept);
                Offering offering = new Offering("", sectionNumber, semester, year, course);
                Registration reg = new Registration(reguuid, offering, grade, status);
                courses.add(reg);
            }
            while (rset.next()) {

            }
            return new jsonResponse("success", "student courses", courses);

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);

        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }

    }

    @Override
    public jsonResponse addCourse(String studentuuid, String courseuuid, int section) {

        Statement stmt = null;
        java.sql.ResultSet rset = null;
        try {
            if (checkSQLInjection(studentuuid) || checkSQLInjection(courseuuid)) {
                return null;
            }

            if (!checkPreReq(studentuuid, courseuuid)) {
                return new jsonResponse("error", "prerequisite not met", null);
            }
            if (checkMaxCourses(studentuuid)) {
                return new jsonResponse("error", "cannot register more than 6 courses", null);
            }
            if (checkAlreadyRegistered(studentuuid, courseuuid, section)) {
                return new jsonResponse("error", "already registered", null);
            }

            stmt = getStatement();
            String strSelect = "select * from offering where course_uuid = '" + courseuuid + "' and section_number = "
                    + section;
            rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                String offeringUuid = rset.getString("uuid");
                String offeringSemester = rset.getString("semester");
                int offeringYear = rset.getInt("year");
                strSelect = "select * from course where uuid = '" + courseuuid + "'";
                rset = stmt.executeQuery(strSelect);
                if (rset.next()) {
                    String courseName = rset.getString("name");
                    String courseNumber = rset.getString("number");
                    String courseDepartment = rset.getString("department");
                    Course course = new Course(courseuuid, courseName, courseNumber, courseDepartment);
                    Offering offering = new Offering(offeringUuid, section, offeringSemester, offeringYear, course);
                    String registrationUuid = UUID.randomUUID().toString();
                    String strInsert = "insert into registration (uuid, student_uuid, course_uuid, section_number, grade, status) values ('"
                            + registrationUuid + "', '" + studentuuid + "', '" + courseuuid + "', " + section + ", '"
                            + "NA" + "', '" + "registered" + "')";
                    int countInserted = stmt.executeUpdate(strInsert);
                    if (countInserted == 1) {
                        Registration registration = new Registration(registrationUuid, offering, "NA", "registered");
                        return new jsonResponse("success", "course added", registration);
                    }

                } else {
                    return new jsonResponse("error", "course not found", null);
                }
            } else {
                return new jsonResponse("error", "offering not found", null);
            }

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "course not added", null);
    }

    private boolean checkAlreadyRegistered(String studentuuid, String courseuuid, int section) {

        Statement stmt = null;
        java.sql.ResultSet rset = null;
        try {
            if (checkSQLInjection(studentuuid) || checkSQLInjection(courseuuid)) {
                return false;
            }

            stmt = getStatement();
            String strSelect = "select * from registration where student_uuid = '" + studentuuid
                    + "' and course_uuid = '"
                    + courseuuid + "' and section_number = " + section;
            rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                return true;
            }
            return false;

        } catch (SQLException e) {
            return false;
        } catch (ClassNotFoundException e) {
            return false;
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return false;
            }
        }
    }

    private boolean checkMaxCourses(String studentuuid) {
        Statement stmt = null;
        java.sql.ResultSet rset = null;
        try {
            if (checkSQLInjection(studentuuid)) {
                return false;
            }

            stmt = getStatement();
            String strSelect = "select * from registration where student_uuid = '" + studentuuid + "'";
            rset = stmt.executeQuery(strSelect);
            int count = 0;
            while (rset.next()) {
                count++;
            }
            if (count >= 6) {
                return true;
            }
            return false;

        } catch (SQLException e) {
            return false;
        } catch (ClassNotFoundException e) {
            return false;
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return false;
            }
        }

    }

    @Override
    public jsonResponse dropCourse(String studentuuid, String courseuuid, int section) {

        Statement stmt = null;
        java.sql.ResultSet rset = null;

        try {
            if (checkSQLInjection(studentuuid) || checkSQLInjection(courseuuid)) {
                return null;
            }
            stmt = getStatement();
            String strDelete = "delete from registration where student_uuid = '" + studentuuid
                    + "' and course_uuid = '"
                    + courseuuid + "' and section_number = " + section;
            int countDeleted = stmt.executeUpdate(strDelete);
            if (countDeleted > 0) {
                return new jsonResponse("success", "course dropped", null);
            }

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "course does not exist", null);
    }

    @Override
    public jsonResponse getCourse(String uuid) {

        Statement stmt = null;
        java.sql.ResultSet rset = null;

        try {
            if (checkSQLInjection(uuid)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from course where uuid = '" + uuid + "'";
            rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                String courseName = rset.getString("name");
                String courseNumber = rset.getString("number");
                String courseDepartment = rset.getString("department");
                Course course = new Course(uuid, courseName, courseNumber, courseDepartment);
                rset.close();
                // get prereqs and join with course table to get course name, number, department
                strSelect = "select * from prerequisite join course on prerequisite.prerequisite_course_uuid = course.uuid where course_uuid = '"
                        + uuid + "'";
                rset = stmt.executeQuery(strSelect);
                ArrayList<Course> prereqs = new ArrayList<Course>();
                while (rset.next()) {
                    String prereqUuid = rset.getString("prerequisite_course_uuid");
                    String prereqName = rset.getString("name");
                    String prereqNumber = rset.getString("number");
                    String prereqDepartment = rset.getString("department");
                    Course prereq = new Course(prereqUuid, prereqName, prereqNumber, prereqDepartment);
                    prereqs.add(prereq);
                }
                course.setPreReqs(prereqs);
                return new jsonResponse("success", "course", course);
            }

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "course not found", null);
    }

    @Override
    public jsonResponse getAllCourses() {

        Statement stmt = null;
        java.sql.ResultSet rset = null;

        try {
            stmt = getStatement();
            String strSelect = "select * from course";
            rset = stmt.executeQuery(strSelect);
            List<Course> courses = new ArrayList<Course>();
            while (rset.next()) {
                String courseName = rset.getString("name");
                String courseNumber = rset.getString("number");
                String courseDepartment = rset.getString("department");
                String uuid = rset.getString("uuid");
                Course course = new Course(uuid, courseName, courseNumber, courseDepartment);
                courses.add(course);
            }
            return new jsonResponse("success", "courses found", courses);

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }

    }

    @Override
    public jsonResponse getCoursePreReqs(String courseuuid) {
        java.sql.ResultSet rset = null;
        Statement stmt = null;
        try {
            if (checkSQLInjection(courseuuid)) {
                return null;
            }
            stmt = getStatement();
            String strSelect = "select * from prerequisite join course on prerequisite.prerequisite_course_uuid = course.uuid where course_uuid = '"
                    + courseuuid + "'";
            rset = stmt.executeQuery(strSelect);
            List<Course> prereqs = new ArrayList<Course>();
            while (rset.next()) {
                String prereqUuid = rset.getString("prerequisite_course_uuid");
                String prereqName = rset.getString("name");
                String prereqNumber = rset.getString("number");
                String prereqDepartment = rset.getString("department");
                Course prereq = new Course(prereqUuid, prereqName, prereqNumber, prereqDepartment);
                prereqs.add(prereq);

            }
            return new jsonResponse("success", "prereqs found", prereqs);

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }

    }

    @Override
    public jsonResponse getCourseOfferings(String courseuuid) {

        Statement stmt = null;
        java.sql.ResultSet rset = null;
        try {
            if (checkSQLInjection(courseuuid)) {
                return null;
            }
            stmt = getStatement();
            String strSelect = "select * from course where uuid = '" + courseuuid + "'";
            rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                String courseName = rset.getString("name");
                String courseNumber = rset.getString("number");
                String courseDepartment = rset.getString("department");
                Course course = new Course(courseuuid, courseName, courseNumber, courseDepartment);
                strSelect = "select * from offering where course_uuid = '" + courseuuid + "'";
                rset = stmt.executeQuery(strSelect);
                List<Offering> offerings = new ArrayList<Offering>();
                while (rset.next()) {
                    String offeringUuid = rset.getString("uuid");
                    String offeringSemester = rset.getString("semester");
                    int offeringYear = rset.getInt("year");
                    int section = rset.getInt("section_number");
                    Offering offering = new Offering(offeringUuid, section, offeringSemester, offeringYear, course);
                    offerings.add(offering);
                }
                return new jsonResponse("success", "offerings found", offerings);
            }

        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (rset != null) {
                    rset.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "course not found", null);
    }

}
