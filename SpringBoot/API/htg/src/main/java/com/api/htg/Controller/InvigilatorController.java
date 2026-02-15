package com.api.htg.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.Entity.InvigilatorEntity;
import com.api.htg.Service.InvigilatorService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class InvigilatorController {

    @Autowired
    private InvigilatorService invigilatorService;

    @GetMapping("/invigilators")
    public ResponseEntity<List<InvigilatorEntity>> getInvigilators() {
        try {
            List<InvigilatorEntity> invigilators = invigilatorService.getInvigilators();
            return new ResponseEntity<>(invigilators, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/invigilators")
    public ResponseEntity<List<InvigilatorEntity>> addInvigilator(@RequestBody InvigilatorEntity entity) {
        try {
            List<InvigilatorEntity> invigilators = invigilatorService.addInvigilator(entity);
            return new ResponseEntity<>(invigilators, HttpStatus.CREATED);
        } catch (Exception e) {
            if (e.getMessage().equals("exists"))
                return new ResponseEntity<>(HttpStatus.IM_USED);
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/invigilators")
    public ResponseEntity<List<InvigilatorEntity>> updateInvigilator(@RequestBody InvigilatorEntity entity) {
        try {
            List<InvigilatorEntity> invigilators = invigilatorService.addInvigilator(entity);
            return new ResponseEntity<>(invigilators, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/invigilators")
    public ResponseEntity<List<InvigilatorEntity>> deleteInvigilator(@RequestBody InvigilatorEntity entity) {
        try {
            List<InvigilatorEntity> invigilators = invigilatorService.deleteInvigilator(entity);
            return new ResponseEntity<>(invigilators, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PatchMapping("/invigilators")
    public ResponseEntity<Void> resetVerifications() {
        try {
            invigilatorService.resetVerifications();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
}
