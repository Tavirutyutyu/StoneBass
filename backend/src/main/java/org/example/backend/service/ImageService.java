package org.example.backend.service;

import org.example.backend.DTO.ImageDTO;
import org.example.backend.model.ImageEntity;
import org.example.backend.model.InstrumentType;
import org.example.backend.repository.ImageRepository;
import org.example.backend.repository.InstrumentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final InstrumentTypeRepository instrumentTypeRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository, InstrumentTypeRepository instrumentTypeRepository) {
        this.imageRepository = imageRepository;
        this.instrumentTypeRepository = instrumentTypeRepository;
    }

    public List<ImageDTO> getAll() {
        return imageRepository.findAll().stream().map(this::createImageDTO).collect(Collectors.toList());
    }

    private ImageDTO createImageDTO(ImageEntity imageEntity) {
        String imageBase64 = Base64.getEncoder().encodeToString(imageEntity.getImage());
        return new ImageDTO(imageEntity.getTitle(), imageEntity.getDescription(), imageBase64);
    }

    public ImageDTO getById(Long id) {
        return imageRepository.findById(id).map(this::createImageDTO).orElseThrow(() -> new RuntimeException("Image not found"));
    }

    public void deleteById(Long id) {
        imageRepository.deleteById(id);
    }

    public ImageDTO upload(String title, String description, MultipartFile file, boolean hasResonator, String instrumentType) throws IOException {
        InstrumentType type = instrumentTypeRepository.findByName(instrumentType).orElseThrow(() -> new RuntimeException("Invalid instrumentType"));
        ImageEntity imageEntity = new ImageEntity(title, description, file.getBytes(), hasResonator, type);
        return createImageDTO(imageRepository.save(imageEntity));
    }

    public List<ImageDTO> getByType(String type) {
        InstrumentType instrumentType = instrumentTypeRepository.findByName(type).orElseThrow(() -> new RuntimeException("Unknown instrumentType"));
        List<ImageEntity> imageEntities = imageRepository.findByInstrumentType(instrumentType);
        return imageEntities.stream().map(this::createImageDTO).collect(Collectors.toList());
    }
}
