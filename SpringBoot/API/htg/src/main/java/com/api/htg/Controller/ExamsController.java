package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Service.ExamsService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class ExamsController {

    @Autowired
    private ExamsService examsService;

    @GetMapping("/exams/{year}/{semester}")
    public ResponseEntity<List<ExamsEntity>> getTimeTable(@PathVariable int year, @PathVariable int semester) {
        List<ExamsEntity> exams = examsService.getTimeTable(year, semester);
        if (exams.isEmpty())
            return new ResponseEntity<>(exams, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(exams, HttpStatus.OK);
    }

    @PostMapping("/exams")
    public ResponseEntity<List<ExamsEntity>> addSubject(@RequestBody ExamsEntity entity) {
        try {
            List<ExamsEntity> exams = examsService.addSubject(entity);
            return new ResponseEntity<>(exams, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/exams")
    public ResponseEntity<List<ExamsEntity>> editSubject(@RequestBody ExamsEntity entity) {
        try {
            List<ExamsEntity> exams = examsService.editSubject(entity);
            return new ResponseEntity<>(exams, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/exams")
    public ResponseEntity<List<ExamsEntity>> deleteSubject(@RequestBody ExamsEntity entity) {
        try {
            List<ExamsEntity> exams = examsService.deleteSubject(entity);
            return new ResponseEntity<>(exams,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

}
