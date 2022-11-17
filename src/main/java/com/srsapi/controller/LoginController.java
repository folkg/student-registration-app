package com.srsapi.controller;

import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import com.srsapi.dao.DataStore;
import com.srsapi.model.Student;
import com.srsapi.model.jsonResponse;

@RequestMapping("login")
@RestController
public class LoginController {
    
        @Autowired
        private DataStore dataStore;
    
        @PostMapping
        public jsonResponse login(@RequestBody Student login) {
            return dataStore.login(login.getEmail(), login.getPassword());
        }
    
}
