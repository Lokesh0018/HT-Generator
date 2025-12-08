package com.api.htg.Entity;

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
    private String imgName;
    private String imgType;
    @Lob
    private byte[] imgData;

    public StudentEntity() {
    }

    public StudentEntity(String id, String name, String email, String imgName, String imgType, byte[] imgData) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.imgName = imgName;
        this.imgType = imgType;
        this.imgData = imgData;
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

}
