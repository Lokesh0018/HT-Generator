package com.api.htg.Service;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.api.htg.Entity.StudentEntity;
import com.api.htg.Repository.StudentJpa;

@Service
public class VerificationService {

    @Autowired
    private StudentJpa studentRepo;

    @Autowired
    private JavaMailSender mailSender;

    public String generateOtp() {
        int otp = (int) (Math.random() * 9000) + 1000;
        return String.valueOf(otp);
    }

    public void sendOtp(String stuMail) throws Exception{
        StudentEntity student = studentRepo.findByEmail(stuMail);
        if(!student.getApprove())
            throw new Exception("You are not Approved");
        String otp = generateOtp();
        student.setOtp(otp);
        student.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        studentRepo.save(student);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(stuMail);
        message.setSubject("HTG Account Verification – OTP (Valid for 5 Minutes)");
        message.setText("Your OTP is: " + otp + "\nPlease do not share this with anyone.");
        mailSender.send(message);
    }

    public StudentEntity verifyOtp(String stuMail, String otp) throws Exception {
        StudentEntity student = studentRepo.findByEmail(stuMail);
        if(!student.getOtp().equals(otp))
            throw new Exception( "Invalid OTP");
        else if(student.getExpiryTime().isBefore(LocalDateTime.now()))
            throw new Exception("OTP has been expired");
        else
            return student;
    }

}
