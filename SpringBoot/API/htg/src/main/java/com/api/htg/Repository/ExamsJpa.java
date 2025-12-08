package com.api.htg.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.htg.Entity.ExamsEntity;

@Repository
public interface ExamsJpa extends JpaRepository<ExamsEntity, String>{
    
    public ExamsEntity findByYearAndSemester(int year,int semester);

}
