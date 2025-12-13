package com.api.htg.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.api.htg.DTO.LoginRequestDTO;
import com.api.htg.DTO.LoginResponseDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> verifyLogin(@RequestBody LoginRequestDTO loginDTO) {
        try {
            LoginResponseDTO responseDTO = loginService.verifyLogin(loginDTO);
            return new ResponseEntity<>(responseDTO,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    

}
