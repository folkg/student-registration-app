package com.srsapi.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

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

    // using regex to validate for sql injection
    private boolean checkSQLInjection(String str) {
        // regex for sql injection check
        String regex = "((\\%27)|(\\'))((\\%6F)|o|(\\%4F))((\\%72)|r|(\\%52))";
        return str.matches(regex);

    }

    public jsonResponse getStudent(String uuid) {
        Statement stmt = null;
        try {
            if (checkSQLInjection(uuid)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from students where uuid = '" + uuid + "'";
            java.sql.ResultSet rset = stmt.executeQuery(strSelect);
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
            String strSelect = "select * from students where email = '" + email + "'";
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

    @Override
    public jsonResponse login(String username, String password) {
        Statement stmt = null;
        try {
            if (checkSQLInjection(username) || checkSQLInjection(password)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from students where email = '" + username + "' and password = '" + password
                    + "'";
            java.sql.ResultSet rset = stmt.executeQuery(strSelect);
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
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "student not found", null);

    }

    @Override
    public jsonResponse register(Student student) {
        Statement stmt = null;
        try {
            if (checkSQLInjection(student.getEmail()) || checkSQLInjection(student.getPassword())) {
                return null;
            }

            if (ifExist(student.getEmail())) {
                return new jsonResponse("error", "email already exist", null);
            }

            stmt = getStatement();
            String strInsert = "insert into students (uuid, first_name, last_name, email, password) values ('"
                    + student.getUuid() + "', '" + student.getFirstName() + "', '" + student.getLastName() + "', '"
                    + student.getEmail() + "', '" + student.getPassword() + "')";
            int countInserted = stmt.executeUpdate(strInsert);
            if (countInserted == 1) {
                return new jsonResponse("success", "student registered", null);
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
    public jsonResponse studentCourses(String uuid) {
        Statement stmt = null;
        try {
            if (checkSQLInjection(uuid)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from students where uuid = '" + uuid + "'";
            java.sql.ResultSet rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                String firstName = rset.getString("first_name");
                String lastName = rset.getString("last_name");
                String email = rset.getString("email");
                String password = rset.getString("password");
                Student student = new Student(uuid, firstName, lastName, email, password);

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
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "student not found", null);

        
    }

    @Override
    public jsonResponse addCourse(String uuid, String courseCode, int section) {
    
        Statement stmt = null;
        try {
            if (checkSQLInjection(uuid) || checkSQLInjection(courseCode)) {
                return null;
            }

         
            stmt = getStatement();
            Student student = (Student) studentCourses(uuid).getData();
            


        } catch (SQLException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } catch (ClassNotFoundException e) {
            return new jsonResponse("error", e.getMessage(), null);
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "course not added", null);
    }

    @Override
    public jsonResponse dropCourse(String uuid, String courseCode) {
       
        Statement stmt = null;
        try {
            if (checkSQLInjection(uuid) || checkSQLInjection(courseCode)) {
                return null;
            }

            stmt = getStatement();
            String strDelete = "delete from student_courses where uuid = '" + uuid + "' and course_code = '" + courseCode
                    + "'";
            int countDeleted = stmt.executeUpdate(strDelete);
            if (countDeleted == 1) {
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
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "course not dropped", null);
    }

    @Override
    public jsonResponse getCourse(String courseCode) {
       
        Statement stmt = null;
        try {
            if (checkSQLInjection(courseCode)) {
                return null;
            }

            stmt = getStatement();
            String strSelect = "select * from courses where course_code = '" + courseCode + "'";
            java.sql.ResultSet rset = stmt.executeQuery(strSelect);
            if (rset.next()) {
                String courseName = rset.getString("course_name");
                String courseDescription = rset.getString("course_description");
                String courseInstructor = rset.getString("course_instructor");
                Course course = new Course(courseCode, courseName);

                return new jsonResponse("success", "course found", course);
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
            } catch (SQLException e) {
                return new jsonResponse("error", e.getMessage(), null);
            }
        }
        return new jsonResponse("error", "course not found", null);
    }

    @Override
    public jsonResponse getAllCourses() {
        // TODO Auto-generated method stub
        return null;
    }

}
