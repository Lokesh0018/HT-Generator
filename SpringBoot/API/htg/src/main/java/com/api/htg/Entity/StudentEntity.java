package com.api.htg.Entity;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Component
@Entity
public class StudentEntity {

    @Id
    private String id;
    private String name;
    private String email;
    private String fatherName;
    private Character section;
    private String imgName;
    private String imgType;
    @Lob
    private byte[] imgData;
    private boolean approve;
    private String otp;
    private LocalDateTime expiryTime;

    public StudentEntity() {
    }

    public StudentEntity(String id, String name, String email, String fatherName, Character section, String imgName, String imgType, byte[] imgData) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.fatherName = fatherName;
        this.section = section;
        this.imgName = imgName;
        this.imgType = imgType;
        this.imgData = imgData;
        this.approve = false;
    }

    public StudentEntity(String id, String name, String email, String fatherName, Character section, String imgName, String imgType,
            byte[] imgData, boolean approve, String otp, LocalDateTime expiryTime) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.fatherName = fatherName;
        this.section = section;
        this.imgName = imgName;
        this.imgType = imgType;
        this.imgData = imgData;
        this.approve = approve;
        this.otp = otp;
        this.expiryTime = expiryTime;
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
    
    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Character getSection() {
        return section;
    }

    public void setSection(Character section) {
        this.section = section;
    }

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public String getImgType() {
        return imgType;
    }

    public void setImgType(String imgType) {
        this.imgType = imgType;
    }

    public byte[] getImgData() {
        return imgData;
    }

    public void setImgData(byte[] imgData) {
        this.imgData = imgData;
    }

    public void setApprove(boolean approve) {
        this.approve = approve;
    }

    public boolean getApprove() {
        return approve;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }
    
}
