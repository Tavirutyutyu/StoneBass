package org.example.backend.service;

import org.example.backend.DTO.ImageDTO;
import org.example.backend.model.ImageEntity;
import org.example.backend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<ImageDTO> getAll() {
        return imageRepository.findAll().stream().map(this::createImageDTO).collect(Collectors.toList());
    }

    private ImageDTO createImageDTO(ImageEntity imageEntity) {
        String imageBase64 = Base64.getEncoder().encodeToString(imageEntity.getImage());
        return new ImageDTO(imageEntity.getTitle(), imageEntity.getDescription(), imageBase64);
    }

    public ImageDTO getById(Long id) {
        return imageRepository.findById(id).map(this::createImageDTO).orElse(null);
    }
}
