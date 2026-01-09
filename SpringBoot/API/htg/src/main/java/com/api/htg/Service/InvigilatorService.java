package com.api.htg.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.Entity.InvigilatorEntity;
import com.api.htg.Repository.InvigilatorJpa;

@Service
public class InvigilatorService {

    @Autowired
    private StudentService studentService;

    @Autowired
    private InvigilatorJpa invigilatorRepo;

    public List<InvigilatorEntity> getInvigilators() {
        return invigilatorRepo.findAll();
    }

    public List<InvigilatorEntity> addInvigilator(InvigilatorEntity entity) throws Exception {
        invigilatorRepo.save(entity);
        return getInvigilators();
    }

    public List<InvigilatorEntity> deleteInvigilator(InvigilatorEntity entity) throws Exception {
        if(!invigilatorRepo.existsById(entity.getId()))
            throw new IllegalStateException();
        invigilatorRepo.deleteById(entity.getId());
        return getInvigilators();
    }

    public void resetVerifications() throws Exception {
        studentService.resetVerifications();
    }
}
