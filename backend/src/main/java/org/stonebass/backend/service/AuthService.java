package org.stonebass.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.stonebass.backend.DTO.LoginRequestDTO;
import org.stonebass.backend.DTO.LoginResponseDTO;
import org.stonebass.backend.model.AdminEntity;
import org.stonebass.backend.repository.AuthRepository;
import org.stonebass.backend.security.jwt.JwtUtils;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthService(AuthRepository authRepository, JwtUtils jwtUtils) {
        this.authRepository = authRepository;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }
    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        AdminEntity admin = authRepository.findById(loginRequest.username()).orElseThrow(() -> new RuntimeException("User not found under the username: " + loginRequest.username()));
        if (passwordEncoder.matches(loginRequest.password(), admin.getPassword())) {
            return new LoginResponseDTO(jwtUtils.generateToken(admin.getUsername()));
        } else {
            throw new RuntimeException("Invalid password!");
        }
    }
}
