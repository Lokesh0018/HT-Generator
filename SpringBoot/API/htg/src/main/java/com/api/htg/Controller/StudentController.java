package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.htg.Entity.StudentEntity;
import com.api.htg.Service.StudentService;

import tools.jackson.databind.ObjectMapper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/admin")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/students")
    public ResponseEntity<List<StudentEntity>> addStudent(@RequestPart("img") MultipartFile img ,@RequestPart("entity") String entityJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            StudentEntity entity = mapper.readValue(entityJson, StudentEntity.class);
            List<StudentEntity> students = studentService.addStudent(img,entity);
            return new ResponseEntity<>(students,HttpStatus.CREATED);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/students/{section}")
    public ResponseEntity<List<StudentEntity>> getStudents(@PathVariable Character section) {
        try {
            List<StudentEntity> students = studentService.getStudents(section);
            return new ResponseEntity<>(students,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);   
        }
    }

    @PutMapping("/students")
    public ResponseEntity<List<StudentEntity>> updateStudent(@RequestPart("img") MultipartFile img,@RequestPart("entity") String entityJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            StudentEntity entity = mapper.readValue(entityJson, StudentEntity.class);
            List<StudentEntity> students = studentService.updateStudent(img, entity);
            return new ResponseEntity<>(students,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/students/{stuId}")
    public ResponseEntity<List<StudentEntity>> deleteStudent(@PathVariable String stuId) {
        try {
            List<StudentEntity> students = studentService.deleteStudent(stuId);
            return new ResponseEntity<>(students,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }
    

}
