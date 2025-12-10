package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.Entity.AdminEntity;
import com.api.htg.Service.AdminService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("settings")
    public ResponseEntity<AdminEntity> updateGeneral(@RequestBody AdminEntity entity) {
        try {
            AdminEntity admin = adminService.updateGeneral(entity);
            return new ResponseEntity<>(admin, HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

}
