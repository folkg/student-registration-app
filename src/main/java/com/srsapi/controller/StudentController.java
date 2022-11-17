package com.srsapi.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srsapi.dao.DataStore;
import com.srsapi.dao.IDataStore;
import com.srsapi.model.Student;
import com.srsapi.model.jsonResponse;

@RequestMapping("students")
@RestController
public class StudentController {

    @Autowired
    private DataStore dataStore;


    @GetMapping(value = "/{id}")
    public jsonResponse getStudentById(@PathVariable("id") String id) {
        return dataStore.getStudent(id);
    }

}