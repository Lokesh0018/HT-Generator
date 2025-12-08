package com.api.htg.Entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Component
@Entity
public class ExamsEntity {
    @Id
    private String subCode;
    private int year;
    private int semester;
    private String sub;
    private String date;
    private String time;

    public ExamsEntity() {
    }
    
    public ExamsEntity(String subCode, int year, int semester, String sub, String date, String time) {
        this.subCode = subCode;
        this.year = year;
        this.semester = semester;
        this.sub = sub;
        this.date = date;
        this.time = time;
    }

    public String getSubCode() {
        return subCode;
    }

    public void setSubCode(String subCode) {
        this.subCode = subCode;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public String getSub() {
        return sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

}
