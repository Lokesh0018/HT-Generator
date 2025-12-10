package com.api.htg.Service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.DTO.LoginDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Repository.AdminJpa;

@Service
public class LoginService {

    @Autowired
    AdminJpa adminRepo;

    public AdminEntity verifyLogin(LoginDTO loginDTO) {
        Optional<AdminEntity> entity = adminRepo.findById(loginDTO.getId());
        if(!entity.isPresent() || !entity.get().getPassword().equals(loginDTO.getPassword()))
            throw new IllegalStateException();
        return entity.get();
    }

}
