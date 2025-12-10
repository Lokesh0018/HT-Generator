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
    private String year;
    private String semester;
    private Integer upComingExams;
    private Integer approvedHallTickets;

    public AdminEntity() {
    }
    
    public AdminEntity(String id, String name, String email, String password, String collageName, String branch,
            Character section, String year, String semester, Integer upComingExams, Integer approvedHallTickets) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.collageName = collageName;
        this.branch = branch;
        this.section = section;
        this.year = year;
        this.semester = semester;
        this.upComingExams = upComingExams;
        this.approvedHallTickets = approvedHallTickets;
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
    
    public Integer getUpComingExams() {
        return upComingExams;
    }
    
    public void setUpComingExams(Integer upComingExams) {
        this.upComingExams = upComingExams;
    }
    
    public Integer getApprovedHallTickets() {
        return approvedHallTickets;
    }
    
    public void setApprovedHallTickets(Integer approvedHallTickets) {
        this.approvedHallTickets = approvedHallTickets;
    }
    


    
}
