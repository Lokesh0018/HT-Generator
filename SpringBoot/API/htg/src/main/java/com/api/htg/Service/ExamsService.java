package com.api.htg.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Repository.ExamsJpa;

@Service
public class ExamsService {

    @Autowired
    private ExamsJpa examsRepo;

    public List<ExamsEntity> getTimeTable(int year,int semester){
        return examsRepo.findByYearAndSemester(year,semester);
    }

    public void addSubject(ExamsEntity entity) throws Exception {
        String subCode = entity.getSubCode();
        Optional<ExamsEntity> optional = examsRepo.findById(subCode);
        if(optional.isPresent())
            throw new IllegalStateException("Subject with code "+subCode+" already exists");
        examsRepo.save(entity);
    }

    public void editSubject(ExamsEntity entity) {
        String subCode = entity.getSubCode();
        Optional<ExamsEntity> optional = examsRepo.findById(subCode);
        ExamsEntity existingEntity = optional.get();
        existingEntity.setSub(entity.getSub());
        existingEntity.setDate(entity.getDate());
        existingEntity.setTime(entity.getTime());
        examsRepo.save(existingEntity);
    }

    public void deleteSubject(String subCode) {
        examsRepo.deleteById(subCode);
    }

}
 