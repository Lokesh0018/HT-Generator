package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.api.htg.DTO.LoginAdminResponseDTO;
import com.api.htg.Service.AdminService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/admin")
    public ResponseEntity<String> notifyAll(@RequestBody String message) {
        try {
            adminService.notifyAll(message);
            return new ResponseEntity<>("Notification sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/admin/settings")
    public ResponseEntity<LoginAdminResponseDTO> updateGeneral(@RequestBody LoginAdminResponseDTO responseDTO) {
        try {
            return new ResponseEntity<>(adminService.updateGeneral(responseDTO), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

}
