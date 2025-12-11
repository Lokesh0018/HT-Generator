package com.api.htg.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.Entity.StudentEntity;
import com.api.htg.Service.HallTicketService;
import com.api.htg.Service.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/admin")
public class HallTicketController {

    @Autowired
    private HallTicketService hallTicketService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/halltickets/{section}")
    public ResponseEntity<List<StudentEntity>> getStudents(@PathVariable Character section) {
        try {
            List<StudentEntity> students = studentService.getStudents(section);
            return new ResponseEntity<>(students,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/halltickets")
    public ResponseEntity<Void> approveAll() {
        try {
            hallTicketService.approveAll();
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/halltickets/{stuId}")
    public ResponseEntity<Void> updateApproval(@PathVariable String stuId) {
        try {
            hallTicketService.updateApproval(stuId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    
    

}
