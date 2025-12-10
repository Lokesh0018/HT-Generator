package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.api.htg.DTO.LoginDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<AdminEntity> verifyLogin(@RequestBody LoginDTO loginDTO) {
        try {
            AdminEntity entity = loginService.verifyLogin(loginDTO);
            return new ResponseEntity<>(entity,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    

}
