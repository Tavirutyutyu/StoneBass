package org.example.backend.service;

import org.example.backend.DTO.InstrumentTypeDTO;
import org.example.backend.model.InstrumentType;
import org.example.backend.repository.InstrumentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstrumentTypeService {
    private final InstrumentTypeRepository instrumentTypeRepository;

    @Autowired
    public InstrumentTypeService(InstrumentTypeRepository instrumentTypeRepository) {
        this.instrumentTypeRepository = instrumentTypeRepository;
    }

    public List<InstrumentTypeDTO> findAll() {
        return instrumentTypeRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private InstrumentTypeDTO convertToDTO(InstrumentType instrumentType) {
        return new InstrumentTypeDTO(instrumentType.getName());
    }
}
