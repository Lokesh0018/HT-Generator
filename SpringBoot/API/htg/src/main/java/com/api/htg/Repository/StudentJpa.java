package com.api.htg.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.htg.Entity.StudentEntity;

@Repository
public interface StudentJpa extends JpaRepository<StudentEntity, String> {

    List<StudentEntity> findBySection(Character section);

    StudentEntity findByEmail(String stuMail);

}