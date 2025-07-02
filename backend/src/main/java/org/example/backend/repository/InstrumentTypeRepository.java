package org.example.backend.repository;

import org.example.backend.model.InstrumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InstrumentTypeRepository extends JpaRepository<InstrumentType, Long> {
    Optional<InstrumentType> findByName(String name);
}
