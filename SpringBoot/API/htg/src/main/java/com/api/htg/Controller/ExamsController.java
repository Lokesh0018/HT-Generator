package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Service.ExamsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/admin")
public class ExamsController {

    @Autowired
    private ExamsService examsService;


    @GetMapping("/exams/{year}/{semester}")
    public ResponseEntity<ExamsEntity> getTimeTable(@PathVariable int year,@PathVariable int semester) {
        ExamsEntity exams = examsService.getTimeTable(year,semester);
        if(exams == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(exams,HttpStatus.OK);
    }
    
}
