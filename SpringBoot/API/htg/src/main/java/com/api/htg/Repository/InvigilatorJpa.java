package com.api.htg.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.htg.Entity.InvigilatorEntity;

@Repository
public interface InvigilatorJpa extends JpaRepository<InvigilatorEntity, String> {

}
