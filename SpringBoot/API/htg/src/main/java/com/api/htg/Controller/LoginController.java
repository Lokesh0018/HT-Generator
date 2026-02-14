package com.api.htg.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.htg.DTO.LoginRequestDTO;
import com.api.htg.DTO.LoginAdminResponseDTO;
import com.api.htg.DTO.LoginInvigilatorResponseDTO;
import com.api.htg.Service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping("/admin")
    public ResponseEntity<LoginAdminResponseDTO> verifyAdminLogin(@RequestBody LoginRequestDTO loginDTO) {
        try {
            LoginAdminResponseDTO responseDTO = loginService.verifyAdminLogin(loginDTO);
            return new ResponseEntity<>(responseDTO,HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/invigilator")
    public ResponseEntity<LoginInvigilatorResponseDTO> verifyInvigilatorLogin(@RequestBody LoginRequestDTO loginDTO) {
        try {
            LoginInvigilatorResponseDTO responseDTO = loginService.verifyInvigilatorLogin(loginDTO);
            return new ResponseEntity<>(responseDTO,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    
}
