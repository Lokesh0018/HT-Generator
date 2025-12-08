package com.api.htg.Entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Component
@Entity
public class AdminEntity {

    @Id
    private Integer id;
    private String email;
    private String name;
    private String password;
    private String collageName;
    private String batch;
    private String branch;
    private String year;
    private String semester;

    public AdminEntity() {
    }

    public AdminEntity(Integer id, String email, String name, String password, String collageName, String batch,
            String branch, String year, String semester) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.collageName = collageName;
        this.batch = batch;
        this.branch = branch;
        this.year = year;
        this.semester = semester;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCollageName() {
        return collageName;
    }

    public void setCollageName(String collageName) {
        this.collageName = collageName;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getSemester() {
        return semester;
    }
    
    public void setSemester(String semester) {
        this.semester = semester;
    }
    
}
