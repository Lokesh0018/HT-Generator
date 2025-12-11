package com.api.htg.DTO;

public class LoginResponseDTO {

    private String id;
    private String name;
    private String email;
    private String collageName;
    private String branch;
    private Character section;
    private Integer year;
    private Integer semester;
    private Integer upComingExams;
    private Integer approvedHallTickets;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String id, String name, String email, String collageName, String branch, Character section,
            Integer year, Integer semester, Integer upComingExams, Integer approvedHallTickets) {
        this.id = id;
        this.name = name;
        this.email = email;
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
