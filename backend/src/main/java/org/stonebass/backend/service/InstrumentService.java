package org.stonebass.backend.service;

import org.stonebass.backend.DTO.InstrumentDTO;
import org.stonebass.backend.DTO.NewInstrumentDTO;
import org.stonebass.backend.DTO.UpdateInstrumentDTO;
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
        List<InstrumentType> types = null;
        List<InstrumentEntity> instruments;
        boolean hasResonatorFilterActive = hasResonatorString != null;
        boolean hasResonatorValue = Boolean.parseBoolean(hasResonatorString);

        if (typeStrings != null && !typeStrings.isEmpty()) {
            types = typeStrings.stream()
                    .map(type -> instrumentTypeRepository.findByName(type).orElseThrow(() -> new RuntimeException("Invalid type: " + type))).toList();
        }

        if (types != null && hasResonatorFilterActive) {
            instruments = instrumentRepository.findByInstrumentTypeInAndInstrumentType_HasResonator(types, hasResonatorValue);
        } else if (types != null) {
            instruments = instrumentRepository.findByInstrumentTypeIn(types);
        } else if (hasResonatorFilterActive) {
            instruments = instrumentRepository.findByInstrumentType_HasResonator(hasResonatorValue);
        } else {
            instruments = instrumentRepository.findAll();
        }

        return instruments.stream().map(this::convertImageDTO).toList();
    }


    public InstrumentDTO edit(UpdateInstrumentDTO updateInstrumentDTO, List<MultipartFile> files) throws IOException {
        InstrumentEntity instrument = instrumentRepository.findByTitle(updateInstrumentDTO.oldTitle()).orElseThrow(() -> new RuntimeException("Instrument " + updateInstrumentDTO.oldTitle() + " not found"));
        InstrumentType type = instrumentTypeRepository.findByName(updateInstrumentDTO.instrumentType()).orElseThrow(() -> new RuntimeException("Invalid instrumentType: " + updateInstrumentDTO.instrumentType()));
        instrument.setTitle(updateInstrumentDTO.newTitle());
        instrument.setDescription(updateInstrumentDTO.description());
        instrument.setYoutubeLink(updateInstrumentDTO.youtubeLink());
        instrument.setInstrumentType(type);
        List<InstrumentImage> images = new ArrayList<>();
        for (MultipartFile file : files) {
            images.add(new InstrumentImage(file.getBytes(), instrument));
        }
        instrument.getImages().clear();
        instrument.setImages(images);
        return convertImageDTO(instrumentRepository.save(instrument));
    }
}
