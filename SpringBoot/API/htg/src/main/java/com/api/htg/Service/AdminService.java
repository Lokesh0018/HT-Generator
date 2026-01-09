package com.api.htg.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.api.htg.DTO.LoginAdminResponseDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Entity.StudentEntity;
import com.api.htg.Repository.AdminJpa;
import com.api.htg.Repository.StudentJpa;

@Service
public class AdminService {

    @Autowired
    AdminJpa adminRepo;

    @Autowired
    StudentJpa studentRepo;

    @Autowired
    JavaMailSender mailSender;


    public void notifyAll(Character section, String message) {
        for(StudentEntity student : studentRepo.findBySection(section)) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(student.getEmail());
            mailMessage.setSubject("Notification From HTG");
            mailMessage.setText(message);
            mailSender.send(mailMessage);
        }
    }

    public LoginAdminResponseDTO updateGeneral(LoginAdminResponseDTO responseDTO) {
        AdminEntity entity = adminRepo.findById(responseDTO.getId()).get();
        entity.setBranch(responseDTO.getBranch());
        entity.setYear(responseDTO.getYear());
        entity.setSemester(responseDTO.getSemester());
        Integer students = studentRepo.findBySection(entity.getSection()).size();
        responseDTO.setStudents(students);
        Integer approvedHallTickets = ((entity.getYear()-1)*2)+entity.getSemester()-1;
        Integer upComingExams = 8-approvedHallTickets; 
        responseDTO.setUpComingExams(upComingExams);
        responseDTO.setApprovedHallTickets(approvedHallTickets);
        adminRepo.save(entity);
        return responseDTO;
    }

}
