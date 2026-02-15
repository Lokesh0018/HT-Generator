package com.api.htg.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.DTO.HallTicketDTO;
import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Entity.StudentEntity;
import com.api.htg.Service.HomeService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class HomeController {

    @Autowired
    private HomeService homeService;

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOTP(@RequestBody Map<String, String> hm) {
        try {
            homeService.sendOtp(hm.get("email"));
            return new ResponseEntity<>("OTP sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("notRegistered"))
                return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<HallTicketDTO> verifyOtp(@RequestBody Map<String, String> hm) {
        try {
            String stuEmail = hm.get("email");
            String otp = hm.get("otp");
            return new ResponseEntity<>(homeService.verifyOtp(stuEmail, otp), HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("otpExpired"))
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/hallticket")
    public ResponseEntity<List<ExamsEntity>> getTimeTable(@RequestBody Map<String, String> hm) {
        try {
            String year = hm.get("year");
            String semester = hm.get("sem");
            List<ExamsEntity> exams = homeService.getTimeTable(year, semester);
            return new ResponseEntity<>(exams, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/invigilator")
    public ResponseEntity<List<StudentEntity>> getStudentsByRoom(@RequestBody Map<String, String> hm) {
        try {
            String id = hm.get("id");
            List<StudentEntity> students = homeService.getStudentsByRoom(id);
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

}
