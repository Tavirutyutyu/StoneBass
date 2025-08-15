package org.stonebass.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.stonebass.backend.DTO.AboutMeDTO;
import org.stonebass.backend.model.AboutMeEntity;
import org.stonebass.backend.repository.AboutMeRepository;

import java.util.Base64;

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

    public AboutMeDTO updateAboutMe(AboutMeDTO aboutMeDTO) {
        AboutMeEntity aboutMeEntity = aboutMeRepository.findFirstBy().orElseThrow(() -> new RuntimeException("No about me found"));
        aboutMeEntity.setTitle(aboutMeDTO.title());
        aboutMeEntity.setDescription(aboutMeDTO.description());
        aboutMeEntity.setProfileImage(getImageFromBase64(aboutMeDTO.profilePictureBase64()));

        aboutMeEntity.setPlayingOn1(getImageFromBase64(aboutMeDTO.playingOn1Base64()));
        aboutMeEntity.setPlayingOn2(getImageFromBase64(aboutMeDTO.playingOn2Base64()));
        aboutMeEntity.setPlayingOn3(getImageFromBase64(aboutMeDTO.playingOn3Base64()));
        aboutMeEntity.setPlayingOn4(getImageFromBase64(aboutMeDTO.playingOn4Base64()));

        aboutMeEntity.setPlayingOn1Description(aboutMeDTO.playingOn1Description());
        aboutMeEntity.setPlayingOn2Description(aboutMeDTO.playingOn2Description());
        aboutMeEntity.setPlayingOn3Description(aboutMeDTO.playingOn3Description());
        aboutMeEntity.setPlayingOn4Description(aboutMeDTO.playingOn4Description());

        AboutMeEntity updatedEntity = aboutMeRepository.save(aboutMeEntity);
        return AboutMeDTO.fromEntity(updatedEntity);
    }

    private byte[] getImageFromBase64(String base64) {
        if (base64 == null || base64.isBlank()) {
            return null;
        }
        return Base64.getDecoder().decode(base64);
    }
}
