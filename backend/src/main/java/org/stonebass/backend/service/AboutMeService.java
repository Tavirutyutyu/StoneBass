package org.stonebass.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.stonebass.backend.DTO.AboutMeDTO;
import org.stonebass.backend.model.AboutMeEntity;
import org.stonebass.backend.repository.AboutMeRepository;

@Service
public class AboutMeService {
    private final AboutMeRepository aboutMeRepository;

    @Autowired
    public AboutMeService(AboutMeRepository aboutMeRepository) {
        this.aboutMeRepository = aboutMeRepository;
    }

    public AboutMeDTO getAboutMe() {
        AboutMeEntity aboutMeEntity = aboutMeRepository.findFirstBy().orElseThrow(() -> new RuntimeException("No about me found"));
        return AboutMeDTO.fromEntity(aboutMeEntity);
    }
}
