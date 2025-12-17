package com.api.htg.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.Entity.StudentEntity;
import com.api.htg.Repository.StudentJpa;

@Service
public class HallTicketService {

    @Autowired
    private StudentJpa studentRepo;

    public void approveAll(Character section) {
        for (StudentEntity student : studentRepo.findBySection(section)) {
            student.setApprove(true);
            studentRepo.save(student);
        };
    }

    public void updateApproval(String stuId) {
        StudentEntity student = studentRepo.findById(stuId).get();
        student.setApprove(!student.getApprove());
        studentRepo.save(student);
    }

}
