package org.example.backend.service;

import org.example.backend.DTO.ImageDTO;
import org.example.backend.DTO.InstrumentTypeDTO;
import org.example.backend.model.InstrumentEntity;
import org.example.backend.model.InstrumentType;
import org.example.backend.repository.InstrumentRepository;
import org.example.backend.repository.InstrumentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstrumentService {
    private final InstrumentRepository instrumentRepository;
    private final InstrumentTypeRepository instrumentTypeRepository;

    @Autowired
    public InstrumentService(InstrumentRepository instrumentRepository, InstrumentTypeRepository instrumentTypeRepository) {
        this.instrumentRepository = instrumentRepository;
        this.instrumentTypeRepository = instrumentTypeRepository;
    }

    public List<ImageDTO> getAll() {
        return instrumentRepository.findAll().stream().map(this::convertImageDTO).collect(Collectors.toList());
    }

    private ImageDTO convertImageDTO(InstrumentEntity instrumentEntity) {
        String imageBase64 = Base64.getEncoder().encodeToString(instrumentEntity.getImage());
        return new ImageDTO(instrumentEntity.getTitle(), instrumentEntity.getDescription(), imageBase64);
    }

    public ImageDTO getById(Long id) {
        return instrumentRepository.findById(id).map(this::convertImageDTO).orElseThrow(() -> new RuntimeException("Image not found"));
    }

    public void deleteById(Long id) {
        instrumentRepository.deleteById(id);
    }

    public ImageDTO upload(String title, String description, MultipartFile file, boolean hasResonator, String instrumentType) throws IOException {
        InstrumentType type = instrumentTypeRepository.findByName(instrumentType).orElseThrow(() -> new RuntimeException("Invalid instrumentType"));
        InstrumentEntity instrumentEntity = new InstrumentEntity(title, description, file.getBytes(), hasResonator, type);
        return convertImageDTO(instrumentRepository.save(instrumentEntity));
    }

    public List<ImageDTO> getByType(String type) {
        InstrumentType instrumentType = instrumentTypeRepository.findByName(type.toLowerCase()).orElseThrow(() -> new RuntimeException("Unknown instrumentType"));
        List<InstrumentEntity> imageEntities = instrumentRepository.findByInstrumentType(instrumentType);
        return imageEntities.stream().map(this::convertImageDTO).toList();
    }

    public List<ImageDTO> getByResonator(boolean hasResonator) {
        return instrumentRepository.findByHasResonator(hasResonator).stream().map(this::convertImageDTO).toList();
    }

    public List<ImageDTO> filter(String typeString, String hasResonatorString) {
        if (typeString != null && hasResonatorString != null) {
            boolean hasResonator = Boolean.parseBoolean(hasResonatorString);
            InstrumentType type = instrumentTypeRepository.findByName(typeString).orElseThrow(() -> new RuntimeException("Invalid instrumentType"));
            return instrumentRepository.findByInstrumentTypeAndHasResonator(type, hasResonator).stream().map(this::convertImageDTO).toList();
        } else if (typeString != null) {
            InstrumentType type = instrumentTypeRepository.findByName(typeString).orElseThrow(() -> new RuntimeException("Invalid instrumentType"));
            return instrumentRepository.findByInstrumentType(type).stream().map(this::convertImageDTO).toList();
        } else if (hasResonatorString != null) {
            boolean hasResonator = Boolean.parseBoolean(hasResonatorString);
            return instrumentRepository.findByHasResonator(hasResonator).stream().map(this::convertImageDTO).toList();
        } else {
            throw new RuntimeException("Invalid instrumentType and hasResonator are null. Can not filter.");
        }
    }
}
