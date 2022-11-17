package com.srsapi.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Component;

import com.srsapi.model.Student;
import com.srsapi.model.jsonResponse;

@Component("dataStore")
public class DataStore implements IDataStore {

    private Statement getStatement() throws SQLException, ClassNotFoundException {
        Connection conn = DriverManager.getConnection("jdbc:mysql://MYSQL6013.site4now.net/db_a39532_ensf608",
                "Ask for it", "ask for it");
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
            String strSelect = "select * from students where email = '" + username + "' and password = '" + password + "'";
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

    

}
