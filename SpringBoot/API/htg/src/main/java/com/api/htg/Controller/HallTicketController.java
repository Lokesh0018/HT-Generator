package com.api.htg.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.Service.HallTicketService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class HallTicketController {

    @Autowired
    private HallTicketService hallTicketService;

    @PutMapping("/halltickets/approveAll/{section}")
    public ResponseEntity<Void> approveAll(@PathVariable Character section) {
        try {
            hallTicketService.approveAll(section);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/halltickets/{stuId}")
    public ResponseEntity<Void> updateApproval(@PathVariable String stuId) {
        try {
            hallTicketService.updateApproval(stuId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

}
