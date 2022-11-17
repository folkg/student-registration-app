package com.srsapi.controller;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;
import com.srsapi.dao.DataStore;
import com.srsapi.model.Student;
import com.srsapi.model.jsonResponse;

@RequestMapping("register")
@RestController
public class RegisterController {

    @Autowired
    private DataStore dataStore;

    @PostMapping
    public jsonResponse register(@RequestBody Student student) {
        return dataStore.register(student);
    }

    
}
