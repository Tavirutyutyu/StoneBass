package org.stonebass.backend.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.stonebass.backend.model.AdminEntity;
import org.stonebass.backend.repository.AuthRepository;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AuthRepository authRepository;
    @Autowired
    public UserDetailsServiceImpl(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username){
        AdminEntity admin = authRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return new User(admin.getUsername(), admin.getPassword(), Collections.emptyList());
    }
}
