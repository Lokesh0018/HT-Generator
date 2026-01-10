package com.api.htg.Entity;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Component
@Entity
public class InvigilatorEntity {

    @Id
    private String id;
    private String name;
    private String password;
    private String branch;
    private String block;
    private String room;
    private Character section;

    public InvigilatorEntity() {
    }

    public InvigilatorEntity(String id, String name, String password, String branch, String block, String room, Character section) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.branch = branch;
        this.block = block;
        this.room = room;
        this.section = section;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    public String getRoom() {
        return room;
    }
    
    public void setRoom(String room) {
        this.room = room;
    }

    public Character getSection() {
        return section;
    }

    public void setSection(Character section) {
        this.section = section;
    }
}
