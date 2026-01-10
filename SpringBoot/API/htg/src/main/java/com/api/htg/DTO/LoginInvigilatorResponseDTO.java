package com.api.htg.DTO;

public class LoginInvigilatorResponseDTO {

    private String id;
    private String name;
    private String branch;
    private Character section;
    private String block;
    private String room;

    public LoginInvigilatorResponseDTO() {
    }

    public LoginInvigilatorResponseDTO(String id, String name, String branch, Character section, String block, String room) {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.section = section;
        this.block = block;
        this.room = room;
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

    public Character getSection() {
        return section;
    }

    public void setSection(Character section) {
        this.section = section;
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
    
}
