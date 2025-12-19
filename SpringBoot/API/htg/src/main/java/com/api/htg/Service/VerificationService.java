package com.api.htg.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.api.htg.DTO.HallTicketDto;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Entity.StudentEntity;
import com.api.htg.Repository.AdminJpa;
import com.api.htg.Repository.StudentJpa;

@Service
public class VerificationService {

    @Autowired
    private StudentJpa studentRepo;

    @Autowired
    private AdminJpa adminRepo;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ExamsService examsService;

    public String generateOtp() {
        int otp = (int) (Math.random() * 9000) + 1000;
        return String.valueOf(otp);
    }

    public void sendOtp(String stuMail) throws Exception{
        StudentEntity student = studentRepo.findByEmail(stuMail);
        if(student == null)
            throw new Exception("notRegistered");
        if(!student.getApprove())
            throw new Exception("notApproved");
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

    public HallTicketDto verifyOtp(String stuMail, String otp) throws Exception {
        StudentEntity student = studentRepo.findByEmail(stuMail);
        if(student.getExpiryTime().isBefore(LocalDateTime.now()) || student.getOtp() == null || student.getExpiryTime() == null)
            throw new Exception("OtpExpired");
        if(!student.getOtp().equals(otp))
            throw new Exception( "InvalidOtp");
        student.setOtp(null);
        student.setExpiryTime(null);
        studentRepo.save(student);
        HallTicketDto hallTicket = new HallTicketDto();
        hallTicket.setId(student.getId());
        hallTicket.setName(student.getName());
        AdminEntity admin = adminRepo.findBySection(student.getSection());
        hallTicket.setBranch(admin.getBranch());
        hallTicket.setYear(admin.getYear());
        hallTicket.setSemester(admin.getSemester());
        hallTicket.setFatherName(student.getFatherName());
        hallTicket.setImgData(student.getImgData());
        hallTicket.setImgType(student.getImgType());
        hallTicket.setImgName(student.getImgName());
        return hallTicket;
    }

    public List<ExamsEntity> getTimeTable(String year, String semester) {
       Integer y = Integer.parseInt(year);
       Integer s = Integer.parseInt(semester);
       List<ExamsEntity> exams = examsService.getTimeTable(y, s);
       return exams;
    }

}
