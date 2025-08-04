package org.stonebass.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.stonebass.backend.DTO.LoginRequestDTO;
import org.stonebass.backend.DTO.LoginResponseDTO;
import org.stonebass.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO loginRequest) {
        return authService.login(loginRequest);
    }
}
