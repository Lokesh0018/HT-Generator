package com.api.htg.Service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.DTO.LoginRequestDTO;
import com.api.htg.DTO.LoginResponseDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Repository.AdminJpa;
import com.api.htg.Repository.StudentJpa;

@Service
public class LoginService {

    @Autowired
    AdminJpa adminRepo;

    @Autowired
    StudentJpa studentRepo;

    public LoginResponseDTO verifyLogin(LoginRequestDTO loginDTO) {
        Optional<AdminEntity> existingEntity = adminRepo.findById(loginDTO.getId());
        if(!existingEntity.isPresent() || !existingEntity.get().getPassword().equals(loginDTO.getPassword()))
            throw new IllegalStateException();
        AdminEntity entity = existingEntity.get();
        LoginResponseDTO responseDTO = new LoginResponseDTO();
        responseDTO.setId(entity.getId());
        responseDTO.setName(entity.getName());
        responseDTO.setEmail(entity.getEmail());
        responseDTO.setCollageName(entity.getCollageName());
        responseDTO.setBranch(entity.getBranch());
        responseDTO.setSection(entity.getSection());
        responseDTO.setYear(entity.getYear());
        responseDTO.setSemester(entity.getSemester());
        Integer students = studentRepo.findBySection(entity.getSection()).size();
        responseDTO.setStudents(students);
        Integer approvedHallTickets = ((entity.getYear()-1)*2)+entity.getSemester()-1;
        Integer upComingExams = 8-approvedHallTickets; 
        responseDTO.setUpComingExams(upComingExams);
        responseDTO.setApprovedHallTickets(approvedHallTickets);
        return responseDTO;
    }

}
