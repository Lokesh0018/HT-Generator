package com.api.htg.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.Entity.AdminEntity;
import com.api.htg.Repository.AdminJpa;

@Service
public class AdminService {

    @Autowired
    AdminJpa adminRepo;

    public void updateGeneral(AdminEntity entity) {
        adminRepo.save(entity);
    }

}
