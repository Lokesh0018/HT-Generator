package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.DTO.LoginAdminResponseDTO;
import com.api.htg.Service.AdminService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/{section}")
    public ResponseEntity<String> notifyAll(@PathVariable Character section,@RequestBody String message) {
        try {
            adminService.notifyAll(section, message);
            return new ResponseEntity<>("Notification sent successfully",HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(e.toString(),HttpStatus.CONFLICT);
        }
    }
    

    @PutMapping("/settings")
    public ResponseEntity<LoginAdminResponseDTO> updateGeneral(@RequestBody LoginAdminResponseDTO responseDTO) {
        try {
            return new ResponseEntity<>(adminService.updateGeneral(responseDTO), HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

}
