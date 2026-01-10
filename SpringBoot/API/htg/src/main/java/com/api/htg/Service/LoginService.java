package com.api.htg.Service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.DTO.LoginRequestDTO;
import com.api.htg.DTO.LoginAdminResponseDTO;
import com.api.htg.DTO.LoginInvigilatorResponseDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Entity.InvigilatorEntity;
import com.api.htg.Repository.AdminJpa;
import com.api.htg.Repository.InvigilatorJpa;
import com.api.htg.Repository.StudentJpa;

@Service
public class LoginService {

    @Autowired
    AdminJpa adminRepo;

    @Autowired
    StudentJpa studentRepo;

    @Autowired
    InvigilatorJpa invigilatorRepo;

    public LoginAdminResponseDTO verifyAdminLogin(LoginRequestDTO loginDTO) throws Exception {
        Optional<AdminEntity> existingEntity = adminRepo.findById(loginDTO.getId());
        if(!existingEntity.isPresent() || !existingEntity.get().getPassword().equals(loginDTO.getPassword()))
            throw new IllegalStateException();
        AdminEntity entity = existingEntity.get();
        LoginAdminResponseDTO responseDTO = new LoginAdminResponseDTO();
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
        responseDTO.setRegulation(entity.getRegulation());
        return responseDTO;
    }

    public LoginInvigilatorResponseDTO verifyInvigilatorLogin(LoginRequestDTO loginDTO) throws Exception {
        Optional<InvigilatorEntity> existingEntity = invigilatorRepo.findById(loginDTO.getId());
        if(!existingEntity.isPresent() || !existingEntity.get().getPassword().equals(loginDTO.getPassword()))
            throw new IllegalStateException();
        InvigilatorEntity entity = existingEntity.get();
        LoginInvigilatorResponseDTO responseDTO = new LoginInvigilatorResponseDTO();
        responseDTO.setId(entity.getId());
        responseDTO.setName(entity.getName());
        responseDTO.setBranch(entity.getBranch());
        responseDTO.setSection(entity.getSection());
        responseDTO.setBlock(entity.getBlock());
        responseDTO.setRoom(entity.getRoom());
        return responseDTO;
    }

}
