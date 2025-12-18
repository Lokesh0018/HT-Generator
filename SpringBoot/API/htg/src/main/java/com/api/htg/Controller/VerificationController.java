package com.api.htg.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.Service.VerificationService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @GetMapping("/{stuEmail}")
    public ResponseEntity<String> sendOTP(@PathVariable String stuEmail) {
        try {
            verificationService.sendOtp(stuEmail);
            return new ResponseEntity<>("OTP sent successfully",HttpStatus.OK);
        }
        catch(Exception e) {
            if(e.toString() == "notRegistered")
                return new ResponseEntity<>(e.toString(),HttpStatus.CONFLICT);
            return new ResponseEntity<>(e.toString(),HttpStatus.UNAUTHORIZED);
        }
    }
    
    @PostMapping("/")
    public ResponseEntity<?> verifyOtp(@RequestParam String stuEmail,@RequestParam String otp) {
        try {
            return new ResponseEntity<>(verificationService.verifyOtp(stuEmail, otp),HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.toString(),HttpStatus.CONFLICT);
        }
    }
    

}
