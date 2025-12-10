package com.api.htg.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.htg.Entity.AdminEntity;

@Repository
public interface AdminJpa extends JpaRepository<AdminEntity,String> {

}
