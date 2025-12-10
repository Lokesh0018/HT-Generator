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

    public List<ExamsEntity> addSubject(ExamsEntity entity) throws Exception {
        Optional<ExamsEntity> optional = examsRepo.findById(entity.getSubCode());
        if(optional.isPresent())
            throw new IllegalStateException();
        examsRepo.save(entity);
        return getTimeTable(entity.getYear(), entity.getSemester());
    }

    public List<ExamsEntity> editSubject(ExamsEntity entity) {
        examsRepo.save(entity);
        return getTimeTable(entity.getYear(), entity.getSemester());
    }

    public List<ExamsEntity> deleteSubject(ExamsEntity entity) {
        examsRepo.deleteById(entity.getSubCode());
        return getTimeTable(entity.getYear(), entity.getSemester());
    }

}
 