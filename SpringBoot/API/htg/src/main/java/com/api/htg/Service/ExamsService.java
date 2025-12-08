package com.api.htg.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Repository.ExamsJpa;

@Service
public class ExamsService {

    @Autowired
    private ExamsJpa examsRepo;

    public ExamsEntity getTimeTable(int year,int semester){
        return examsRepo.findByYearAndSemester(year,semester);
    }


}
