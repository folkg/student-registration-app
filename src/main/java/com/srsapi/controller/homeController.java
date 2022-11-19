package com.srsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.srsapi.dao.DataStore;
import com.srsapi.model.Student;
import com.srsapi.model.jsonResponse;

@Controller
public class homeController {

    @Autowired
    DataStore dataStore;

    @RequestMapping("/")

    public String homePage(Model model) {
        jsonResponse res = dataStore.getStudent("1");
        Student student = (Student) res.getData();
        model.addAttribute("student", student);
        return "home";

    }

}