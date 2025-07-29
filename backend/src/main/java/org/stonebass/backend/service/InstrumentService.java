package org.stonebass.backend.service;

import org.stonebass.backend.DTO.InstrumentDTO;
import org.stonebass.backend.DTO.NewInstrumentDTO;
import org.stonebass.backend.model.InstrumentEntity;
import org.stonebass.backend.model.InstrumentImage;
import org.stonebass.backend.model.InstrumentType;
import org.stonebass.backend.repository.InstrumentRepository;
import org.stonebass.backend.repository.InstrumentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
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

    public List<InstrumentDTO> getAll() {
        return instrumentRepository.findAll().stream().map(this::convertImageDTO).collect(Collectors.toList());
    }

    private InstrumentDTO convertImageDTO(InstrumentEntity instrumentEntity) {
        List<String> imageBase64List = instrumentEntity.getImages().stream().map(image -> Base64.getEncoder().encodeToString(image.getImage())).toList();
        return new InstrumentDTO(instrumentEntity.getId(), instrumentEntity.getTitle(), instrumentEntity.getDescription(), instrumentEntity.getInstrumentType().getName(), imageBase64List, instrumentEntity.getYoutubeLink());
    }

    public InstrumentDTO getById(Long id) {
        return instrumentRepository.findById(id).map(this::convertImageDTO).orElseThrow(() -> new RuntimeException("Image not found"));
    }

    public void deleteById(Long id) {
        instrumentRepository.deleteById(id);
    }

    public InstrumentDTO upload(NewInstrumentDTO newInstrumentDTO, List<MultipartFile> files) throws IOException {
        InstrumentType type = instrumentTypeRepository.findByName(newInstrumentDTO.instrumentType()).orElseThrow(() -> new RuntimeException("Invalid instrumentType: " + newInstrumentDTO.instrumentType()));
        InstrumentEntity instrumentEntity = new InstrumentEntity(newInstrumentDTO.title(), newInstrumentDTO.description(), type, newInstrumentDTO.youtubeLink());
        List<InstrumentImage> images = new ArrayList<>();
        for (MultipartFile file : files) {
            images.add(new InstrumentImage(file.getBytes(), instrumentEntity));
        }
        instrumentEntity.setImages(images);
        return convertImageDTO(instrumentRepository.save(instrumentEntity));
    }

    public List<InstrumentDTO> filter(List<String> typeStrings, String hasResonatorString) {
        boolean hasResonatorFilter = hasResonatorString != null && Boolean.parseBoolean(hasResonatorString);

        List<InstrumentType> types = new ArrayList<>();
        if (typeStrings != null && !typeStrings.isEmpty()) {
            for (String type : typeStrings) {
                types.add(instrumentTypeRepository.findByName(type).orElseThrow(() -> new RuntimeException("Invalid type: " + type)));
            }
        }

        if (!types.isEmpty() && hasResonatorString != null) {
            return instrumentRepository.findByInstrumentTypeInAndInstrumentType_HasResonator(types, hasResonatorFilter)
                    .stream()
                    .map(this::convertImageDTO)
                    .toList();
        } else if (!types.isEmpty()) {
            return instrumentRepository.findByInstrumentTypeIn(types)
                    .stream()
                    .map(this::convertImageDTO)
                    .toList();
        } else if (hasResonatorString != null) {
            return instrumentRepository.findByInstrumentType_HasResonator(hasResonatorFilter)
                    .stream()
                    .map(this::convertImageDTO)
                    .toList();
        } else {
            return getAll();
        }
    }
}
