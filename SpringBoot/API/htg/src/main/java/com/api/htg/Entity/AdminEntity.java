package com.api.htg.Entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Component
@Entity
public class AdminEntity {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String collageName;
    private String branch;
    private Character section;
    private Integer year;
    private Integer semester;
    private String regulation;

    public AdminEntity() {
    }
    
    public AdminEntity(String id, String name, String email, String password, String collageName, String branch,
            Character section, Integer year, Integer semester, String regulation) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.collageName = collageName;
        this.branch = branch;
        this.section = section;
        this.year = year;
        this.semester = semester;
        this.regulation = regulation;
    }
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
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
    
    public String getBranch() {
        return branch;
    }
    
    public void setBranch(String branch) {
        this.branch = branch;
    }
    
    public Character getSection() {
        return section;
    }
    
    public void setSection(Character section) {
        this.section = section;
    }
    
    public Integer getYear() {
        return year;
    }
    
    public void setYear(Integer year) {
        this.year = year;
    }
    
    public Integer getSemester() {
        return semester;
    }
    
    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getRegulation() {
        return regulation;
    }

    public void setRegulation(String regulation) {
        this.regulation = regulation;
    }
    
}
