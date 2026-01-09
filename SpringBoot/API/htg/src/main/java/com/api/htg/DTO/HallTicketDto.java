package com.api.htg.DTO;

import jakarta.persistence.Lob;

public class HallTicketDTO {

    private String id;
    private String name;
    private String branch;
    private Integer year;
    private Integer semester;
    private String fatherName;

    @Lob
    private byte[] imgData;
    private String imgType;
    private String imgName;
    @Lob
    private byte[] qrData;

    public HallTicketDTO() {
    }

    public HallTicketDTO(String id, String name, String branch, Integer year, Integer semester, String fatherName,
            byte[] imgData, String imgType, String imgName, byte[] qrData) {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.year = year;
        this.semester = semester;
        this.fatherName = fatherName;
        this.imgData = imgData;
        this.imgType = imgType;
        this.imgName = imgName;
        this.qrData = qrData;
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

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
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

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public byte[] getImgData() {
        return imgData;
    }

    public void setImgData(byte[] imgData) {
        this.imgData = imgData;
    }

    public String getImgType() {
        return imgType;
    }

    public void setImgType(String imgType) {
        this.imgType = imgType;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public byte[] getQrData() {
        return qrData;
    }

    public void setQrData(byte[] qrData) {
        this.qrData = qrData;
    }
    
}
