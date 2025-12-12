package com.api.htg.Service;

import org.apache.logging.log4j.message.SimpleMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

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

    public AdminEntity updateGeneral(AdminEntity entity) {
        return adminRepo.save(entity);
    }

}
