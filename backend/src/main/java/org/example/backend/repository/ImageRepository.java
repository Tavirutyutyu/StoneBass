package org.example.backend.repository;

import org.example.backend.DTO.ImageDTO;
import org.example.backend.model.ImageEntity;
import org.example.backend.model.InstrumentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    List<ImageEntity> findByInstrumentType(InstrumentType instrumentType);
    List<ImageDTO> findByHasResonator(boolean hasResonator);
}
