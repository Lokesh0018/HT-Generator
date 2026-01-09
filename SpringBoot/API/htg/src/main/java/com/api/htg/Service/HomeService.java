package com.api.htg.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.api.htg.DTO.HallTicketDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Entity.InvigilatorEntity;
import com.api.htg.Entity.StudentEntity;
import com.api.htg.Repository.AdminJpa;
import com.api.htg.Repository.StudentJpa;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import jakarta.persistence.criteria.CriteriaBuilder.In;

@Service
public class HomeService {

    @Autowired
    private StudentJpa studentRepo;

    @Autowired
    private AdminJpa adminRepo;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ExamsService examsService;

    @Autowired
    private InvigilatorService invigilatorService;


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

    public HallTicketDTO verifyOtp(String stuMail, String otp) throws Exception {
        StudentEntity student = studentRepo.findByEmail(stuMail);
        if(student.getExpiryTime().isBefore(LocalDateTime.now()) || student.getOtp() == null || student.getExpiryTime() == null)
            throw new Exception("OtpExpired");
        if(!student.getOtp().equals(otp))
            throw new Exception( "InvalidOtp");
        student.setOtp(null);
        student.setExpiryTime(null);
        studentRepo.save(student);
        AdminEntity admin = adminRepo.findBySection(student.getSection());
        String id = student.getId();
        String name = student.getName();
        String branch = admin.getBranch();
        Integer year = admin.getYear();
        Integer semester = admin.getSemester();
        HallTicketDTO hallTicket = new HallTicketDTO();
        hallTicket.setId(id);
        hallTicket.setName(name);
        hallTicket.setBranch(branch);
        hallTicket.setYear(year);
        hallTicket.setSemester(semester);
        hallTicket.setFatherName(student.getFatherName());
        hallTicket.setImgData(student.getImgData());
        hallTicket.setImgType(student.getImgType());
        hallTicket.setImgName(student.getImgName());
        hallTicket.setQrData(generateQr(id));
        return hallTicket;
    }

    public List<ExamsEntity> getTimeTable(String year, String semester) {
       Integer y = Integer.parseInt(year);
       Integer s = Integer.parseInt(semester);
       List<ExamsEntity> exams = examsService.getTimeTable(y, s);
       return exams;
    }

    public List<StudentEntity> getStudentsByRoom(String id) throws Exception {
        List<InvigilatorEntity> invigilators = invigilatorService.getInvigilators();
        int index = -1;
        for (int i = 0; i < invigilators.size(); i++)
            if (invigilators.get(i).getId().equals(id)) {
                index = i;
                break;
            }
        if (index == -1) 
            throw new Exception("Invigilator not found with id: " + id);
        char section = (char) ('A' + index);
        return studentRepo.findBySection(section);
    }

    public byte[] generateQr(String json) throws Exception{
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(json,BarcodeFormat.QR_CODE,300,300);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix,"PNG",byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }
}
